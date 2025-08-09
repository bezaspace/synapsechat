"""
RAG Service using Gemini Embeddings and Supabase Vector Search

Handles document embedding generation and similarity search for RAG functionality.
"""

import os
import numpy as np
from typing import List, Dict, Any, Optional
from google import genai
from google.genai import types
from supabase import Client
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self, supabase_client: Client):
        """Initialize RAG service with Gemini embeddings and Supabase client."""
        self.supabase = supabase_client
        
        # Initialize Gemini client for embeddings
        self.genai_client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
        
        # Embedding configuration
        self.embedding_model = "gemini-embedding-001"
        self.embedding_dimension = 768
    
    def generate_embeddings(self, texts: List[str], task_type: str = "RETRIEVAL_DOCUMENT") -> List[np.ndarray]:
        """
        Generate embeddings for a list of texts using Gemini.
        
        Args:
            texts: List of text strings to embed
            task_type: Task type for optimization (RETRIEVAL_DOCUMENT or QUESTION_ANSWERING)
            
        Returns:
            List of normalized embedding vectors
        """
        try:
            # Generate embeddings using Gemini
            result = self.genai_client.models.embed_content(
                model=self.embedding_model,
                contents=texts,
                config=types.EmbedContentConfig(
                    task_type=task_type,
                    output_dimensionality=self.embedding_dimension
                )
            )
            
            # Convert to numpy arrays and normalize
            embeddings = []
            for embedding_obj in result.embeddings:
                embedding_array = np.array(embedding_obj.values)
                # Normalize for cosine similarity (required for dimensions other than 3072)
                normalized_embedding = embedding_array / np.linalg.norm(embedding_array)
                embeddings.append(normalized_embedding)
            
            return embeddings
            
        except Exception as e:
            print(f"Error generating embeddings: {e}")
            return []
    
    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """
        Split text into overlapping chunks for better retrieval.
        
        Args:
            text: Text to chunk
            chunk_size: Approximate number of words per chunk
            overlap: Number of words to overlap between chunks
            
        Returns:
            List of text chunks
        """
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk = ' '.join(words[i:i + chunk_size])
            if chunk.strip():
                chunks.append(chunk.strip())
        
        return chunks
    
    async def store_document_embeddings(self, document_id: str, content: str) -> bool:
        """
        Process document content, generate embeddings, and store in database.
        
        Args:
            document_id: UUID of the document
            content: Full text content of the document
            
        Returns:
            True if successful, False otherwise
        """
        try:
            print(f"Starting embedding generation for document {document_id}")
            
            # Chunk the document content
            chunks = self.chunk_text(content)
            print(f"Generated {len(chunks)} chunks")
            
            if not chunks:
                print("No chunks generated from document content")
                return False
            
            # Generate embeddings for all chunks
            print("Generating embeddings with Gemini...")
            embeddings = self.generate_embeddings(chunks, task_type="RETRIEVAL_DOCUMENT")
            print(f"Generated {len(embeddings)} embeddings")
            
            if len(embeddings) != len(chunks):
                print(f"Embedding count mismatch: {len(embeddings)} vs {len(chunks)}")
                return False
            
            # Store chunks and embeddings in database
            chunk_data = []
            for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
                chunk_data.append({
                    "document_id": document_id,
                    "chunk_index": i,
                    "content": chunk,
                    "embedding": embedding.tolist()  # Convert numpy array to list for JSON
                })
            
            print(f"Inserting {len(chunk_data)} chunks into database...")
            # Insert all chunks at once
            result = self.supabase.table("document_chunks").insert(chunk_data).execute()
            
            success = len(result.data) == len(chunk_data)
            print(f"Database insertion {'successful' if success else 'failed'}")
            
            return success
            
        except Exception as e:
            print(f"Error storing document embeddings: {e}")
            import traceback
            traceback.print_exc()
            return False
    
    async def search_similar_chunks(self, query: str, user_id: str = "anonymous", limit: int = 5) -> List[Dict[str, Any]]:
        """
        Search for document chunks similar to the query.
        
        Args:
            query: Search query text
            user_id: User ID to filter documents
            limit: Maximum number of chunks to return
            
        Returns:
            List of similar chunks with metadata
        """
        try:
            # Generate embedding for the query
            query_embeddings = self.generate_embeddings([query], task_type="QUESTION_ANSWERING")
            
            if not query_embeddings:
                print("Failed to generate query embedding")
                return []
            
            query_embedding = query_embeddings[0].tolist()
            
            # Search for similar chunks using cosine similarity
            # Note: Supabase uses 1 - cosine_distance for similarity
            result = self.supabase.rpc(
                "search_document_chunks",
                {
                    "query_embedding": query_embedding,
                    "user_id_filter": user_id,
                    "similarity_threshold": 0.7,
                    "match_count": limit
                }
            ).execute()
            
            return result.data or []
            
        except Exception as e:
            print(f"Error searching similar chunks: {e}")
            # Fallback to simple text search if vector search fails
            try:
                result = self.supabase.table("document_chunks").select(
                    "*, documents!inner(user_id, filename)"
                ).ilike("content", f"%{query}%").eq(
                    "documents.user_id", user_id
                ).limit(limit).execute()
                
                return result.data or []
                
            except Exception as fallback_error:
                print(f"Fallback search also failed: {fallback_error}")
                return []
    
    async def get_rag_context(self, query: str, user_id: str = "anonymous", max_chunks: int = 3) -> str:
        """
        Get relevant context for RAG from document chunks.
        
        Args:
            query: User's question/query
            user_id: User ID to filter documents
            max_chunks: Maximum number of chunks to include in context
            
        Returns:
            Formatted context string for the agent
        """
        try:
            similar_chunks = await self.search_similar_chunks(query, user_id, max_chunks)
            
            if not similar_chunks:
                return ""
            
            # Format context for the agent
            context_parts = []
            for i, chunk in enumerate(similar_chunks, 1):
                filename = chunk.get("documents", {}).get("filename", "Unknown Document")
                content = chunk.get("content", "")
                context_parts.append(f"[Document {i}: {filename}]\n{content}")
            
            context = "\n\n".join(context_parts)
            
            return f"""Based on the following relevant documents from your knowledge base:

{context}

Please use this information to provide a comprehensive and accurate answer. If the documents don't contain relevant information for the question, please indicate that and provide your general knowledge response."""
            
        except Exception as e:
            print(f"Error getting RAG context: {e}")
            return ""