"""
FastAPI Backend for Neurosurgery Chat Application

This server provides AI-powered neurosurgery assistance using Google ADK.
"""

import os
import uuid
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

# Import the neurosurgery agent and database service
from neurosurgery_agent.agent import query_neurosurgery_agent
from database import db_service
from rag_service import RAGService
from document_service import DocumentService

# Initialize FastAPI app
app = FastAPI(
    title="Neurosurgery AI Backend",
    description="FastAPI backend for neurosurgery AI chat using Google ADK with RAG",
    version="1.0.0"
)

# Initialize RAG and document services
rag_service = RAGService(db_service.supabase)
document_service = DocumentService(db_service.supabase, rag_service)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:9002",  # Next.js dev server port from package.json
        "http://127.0.0.1:3000",
        "http://127.0.0.1:9002"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Request/Response models
class ChatRequest(BaseModel):
    query: str
    session_id: str = None


class ChatResponse(BaseModel):
    answer: str
    source: str = None
    session_id: str


class ChatHistoryResponse(BaseModel):
    messages: List[Dict[str, Any]]
    session_id: str


class SessionSummary(BaseModel):
    session_id: str
    title: str
    created_at: str
    updated_at: str
    message_count: int


class UserSessionsResponse(BaseModel):
    sessions: List[SessionSummary]


class DocumentResponse(BaseModel):
    id: str
    filename: str
    file_size: int
    mime_type: str
    created_at: str
    updated_at: str


class DocumentListResponse(BaseModel):
    documents: List[DocumentResponse]


class UploadResponse(BaseModel):
    success: bool
    message: str
    document: DocumentResponse = None


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint to verify the server is running."""
    return {
        "status": "healthy",
        "service": "neurosurgery-ai-backend",
        "version": "1.0.0"
    }


# Main chat endpoint
@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    """
    Main endpoint for chatting with the neurosurgery AI agent.
    
    Args:
        request: ChatRequest containing the user's query and optional session_id
        
    Returns:
        ChatResponse with the agent's answer and metadata
    """
    try:
        # Validate input
        if not request.query or not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())
        
        # Load existing chat history
        existing_messages = await db_service.load_chat_session(session_id) or []
        
        # Create user message
        user_message = {
            "id": str(uuid.uuid4()),
            "role": "user",
            "content": request.query.strip()
        }
        
        # Query the neurosurgery agent with RAG support
        result = await query_neurosurgery_agent(
            question=request.query.strip(),
            session_id=session_id,
            user_id="anonymous"  # TODO: Replace with actual user ID when auth is implemented
        )
        
        # Create assistant message
        assistant_message = {
            "id": str(uuid.uuid4()),
            "role": "assistant",
            "content": result["answer"],
            "source": result.get("source", "Neurosurgery AI Agent")
        }
        
        # Update messages list
        updated_messages = existing_messages + [user_message, assistant_message]
        
        # Save to database
        await db_service.save_chat_session(session_id, updated_messages)
        
        # Return the response
        return ChatResponse(
            answer=result["answer"],
            source=result.get("source", "Neurosurgery AI Agent"),
            session_id=result["session_id"]
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


# Chat history endpoint
@app.get("/api/chat/{session_id}", response_model=ChatHistoryResponse)
async def get_chat_history(session_id: str):
    """
    Get chat history for a specific session.
    
    Args:
        session_id: The session ID to retrieve history for
        
    Returns:
        ChatHistoryResponse with messages and session_id
    """
    try:
        messages = await db_service.load_chat_session(session_id) or []
        
        return ChatHistoryResponse(
            messages=messages,
            session_id=session_id
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving chat history: {str(e)}"
        )


# User sessions endpoint
@app.get("/api/sessions", response_model=UserSessionsResponse)
async def get_user_sessions(user_id: str = "anonymous"):
    """
    Get all chat sessions for a user.
    
    Args:
        user_id: User identifier (defaults to "anonymous")
        
    Returns:
        UserSessionsResponse with list of session summaries
    """
    try:
        sessions_data = await db_service.get_user_sessions(user_id)
        
        sessions = []
        for session in sessions_data:
            # Load messages to get count and generate title
            messages = await db_service.load_chat_session(session["session_id"]) or []
            
            # Generate title from first user message or use default
            title = "New Chat"
            if messages:
                first_user_msg = next((msg for msg in messages if msg["role"] == "user"), None)
                if first_user_msg:
                    # Use first 50 characters of first message as title
                    title = first_user_msg["content"][:50]
                    if len(first_user_msg["content"]) > 50:
                        title += "..."
            
            sessions.append(SessionSummary(
                session_id=session["session_id"],
                title=title,
                created_at=session["created_at"],
                updated_at=session["updated_at"],
                message_count=len(messages)
            ))
        
        return UserSessionsResponse(sessions=sessions)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving user sessions: {str(e)}"
        )


# Delete session endpoint
@app.delete("/api/chat/{session_id}")
async def delete_chat_session(session_id: str, user_id: str = "anonymous"):
    """
    Delete a specific chat session.
    
    Args:
        session_id: The session ID to delete
        user_id: User identifier (defaults to "anonymous")
        
    Returns:
        Success message
    """
    try:
        success = await db_service.delete_chat_session(session_id, user_id)
        
        if not success:
            raise HTTPException(
                status_code=404,
                detail="Session not found or could not be deleted"
            )
        
        return {"message": "Session deleted successfully", "session_id": session_id}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting chat session: {str(e)}"
        )


# Document upload endpoint
@app.post("/api/documents/upload", response_model=UploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    user_id: str = Form(default="anonymous")
):
    """
    Upload a document for RAG processing.
    
    Args:
        file: The uploaded file
        user_id: User identifier
        
    Returns:
        Upload response with document metadata
    """
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        # Read file content
        content = await file.read()
        
        if len(content) == 0:
            raise HTTPException(status_code=400, detail="Empty file provided")
        
        # Process and store document
        document = await document_service.upload_document(
            filename=file.filename,
            content=content,
            mime_type=file.content_type or "text/plain",
            user_id=user_id
        )
        
        if not document:
            raise HTTPException(
                status_code=500,
                detail="Failed to process document. Please ensure it's a text file."
            )
        
        return UploadResponse(
            success=True,
            message="Document uploaded and processed successfully",
            document=DocumentResponse(**document)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading document: {str(e)}"
        )


# Get user documents endpoint
@app.get("/api/documents", response_model=DocumentListResponse)
async def get_documents(user_id: str = "anonymous"):
    """
    Get all documents for a user.
    
    Args:
        user_id: User identifier
        
    Returns:
        List of user documents
    """
    try:
        documents = await document_service.get_user_documents(user_id)
        
        return DocumentListResponse(
            documents=[DocumentResponse(**doc) for doc in documents]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving documents: {str(e)}"
        )


# Delete document endpoint
@app.delete("/api/documents/{document_id}")
async def delete_document(document_id: str, user_id: str = "anonymous"):
    """
    Delete a document and its associated embeddings.
    
    Args:
        document_id: ID of the document to delete
        user_id: User identifier
        
    Returns:
        Success message
    """
    try:
        success = await document_service.delete_document(document_id, user_id)
        
        if not success:
            raise HTTPException(
                status_code=404,
                detail="Document not found or could not be deleted"
            )
        
        return {"message": "Document deleted successfully", "document_id": document_id}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting document: {str(e)}"
        )


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with basic API information."""
    return {
        "message": "Neurosurgery AI Backend with RAG",
        "docs": "/docs",
        "health": "/health",
        "chat_endpoint": "/api/chat",
        "documents_endpoint": "/api/documents"
    }


if __name__ == "__main__":
    # Get configuration from environment
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8001))
    
    # Run the server
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,  # Enable auto-reload during development
        log_level="info"
    )