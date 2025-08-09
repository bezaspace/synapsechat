"""
Document Service for handling file uploads and document management.

Handles document storage, processing, and management operations.
"""

import os
import uuid
from typing import List, Dict, Any, Optional
from supabase import Client
from rag_service import RAGService

class DocumentService:
    def __init__(self, supabase_client: Client, rag_service: RAGService):
        """Initialize document service."""
        self.supabase = supabase_client
        self.rag_service = rag_service
    
    def extract_text_from_content(self, content: bytes, mime_type: str) -> str:
        """
        Extract text content from uploaded file.
        
        Args:
            content: File content as bytes
            mime_type: MIME type of the file
            
        Returns:
            Extracted text content
        """
        try:
            print(f"Processing file with MIME type: {mime_type}")
            print(f"Content length: {len(content)} bytes")
            
            # Handle text files
            if mime_type and mime_type.startswith('text/'):
                text = content.decode('utf-8')
                print(f"Extracted text length: {len(text)} characters")
                return text
            
            # Handle common document formats
            elif mime_type == 'application/pdf':
                # For now, return a placeholder - you can integrate PyPDF2 or similar
                return "PDF content extraction not implemented yet. Please upload text files."
            
            elif mime_type in ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
                return "Word document content extraction not implemented yet. Please upload text files."
            
            else:
                # Try to decode as text anyway
                try:
                    text = content.decode('utf-8')
                    print(f"Fallback text extraction successful, length: {len(text)} characters")
                    return text
                except UnicodeDecodeError as e:
                    print(f"Unicode decode error: {e}")
                    return f"Unsupported file type: {mime_type}. Please upload text files."
                    
        except Exception as e:
            print(f"Error extracting text from content: {e}")
            return f"Error processing file: {str(e)}"
    
    async def upload_document(self, filename: str, content: bytes, mime_type: str, user_id: str = "anonymous") -> Optional[Dict[str, Any]]:
        """
        Upload and process a document.
        
        Args:
            filename: Name of the uploaded file
            content: File content as bytes
            mime_type: MIME type of the file
            user_id: User ID who uploaded the document
            
        Returns:
            Document metadata if successful, None otherwise
        """
        try:
            print(f"Starting upload for file: {filename}")
            
            # Extract text content
            text_content = self.extract_text_from_content(content, mime_type)
            
            if not text_content or text_content.strip() == "":
                print("No text content extracted from file")
                return None
            
            # Check if text content contains error messages
            if text_content.startswith("PDF content extraction not implemented") or \
               text_content.startswith("Word document content extraction not implemented") or \
               text_content.startswith("Unsupported file type") or \
               text_content.startswith("Error processing file"):
                print(f"Text extraction failed: {text_content}")
                return None
            
            print(f"Text content extracted successfully, length: {len(text_content)}")
            
            # Store document in database
            document_data = {
                "user_id": user_id,
                "filename": filename,
                "content": text_content,
                "file_size": len(content),
                "mime_type": mime_type
            }
            
            print("Inserting document into database...")
            try:
                result = self.supabase.table("documents").insert(document_data).execute()
                print(f"Database insert result: {result}")
                
                if not result.data:
                    print("Failed to insert document into database - no data returned")
                    return None
            except Exception as db_error:
                print(f"Database insertion error: {db_error}")
                # Check if table exists
                try:
                    test_result = self.supabase.table("documents").select("*").limit(1).execute()
                    print("Documents table exists and is accessible")
                except Exception as table_error:
                    print(f"Documents table may not exist: {table_error}")
                return None
            
            document = result.data[0]
            document_id = document["id"]
            print(f"Document inserted with ID: {document_id}")
            
            # Generate and store embeddings
            print("Generating embeddings...")
            embedding_success = await self.rag_service.store_document_embeddings(
                document_id, text_content
            )
            
            if not embedding_success:
                # If embedding fails, delete the document
                print("Embedding generation failed, cleaning up...")
                self.supabase.table("documents").delete().eq("id", document_id).execute()
                print("Failed to generate embeddings, document deleted")
                return None
            
            print("Document upload completed successfully")
            return document
            
        except Exception as e:
            print(f"Error uploading document: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    async def get_user_documents(self, user_id: str = "anonymous") -> List[Dict[str, Any]]:
        """
        Get all documents for a user.
        
        Args:
            user_id: User ID to filter documents
            
        Returns:
            List of document metadata
        """
        try:
            result = self.supabase.table("documents").select(
                "id, filename, file_size, mime_type, created_at, updated_at"
            ).eq("user_id", user_id).order("created_at", desc=True).execute()
            
            return result.data or []
            
        except Exception as e:
            print(f"Error getting user documents: {e}")
            return []
    
    async def delete_document(self, document_id: str, user_id: str = "anonymous") -> bool:
        """
        Delete a document and its associated chunks.
        
        Args:
            document_id: ID of the document to delete
            user_id: User ID for security check
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Delete document (chunks will be deleted automatically due to CASCADE)
            result = self.supabase.table("documents").delete().eq(
                "id", document_id
            ).eq("user_id", user_id).execute()
            
            return len(result.data) > 0
            
        except Exception as e:
            print(f"Error deleting document: {e}")
            return False
    
    async def get_document_content(self, document_id: str, user_id: str = "anonymous") -> Optional[str]:
        """
        Get the full content of a document.
        
        Args:
            document_id: ID of the document
            user_id: User ID for security check
            
        Returns:
            Document content if found, None otherwise
        """
        try:
            result = self.supabase.table("documents").select("content").eq(
                "id", document_id
            ).eq("user_id", user_id).execute()
            
            if result.data:
                return result.data[0]["content"]
            
            return None
            
        except Exception as e:
            print(f"Error getting document content: {e}")
            return None