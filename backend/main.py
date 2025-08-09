"""
FastAPI Backend for Neurosurgery Chat Application

This server provides AI-powered neurosurgery assistance using Google ADK.
"""

import os
import uuid
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

# Import the neurosurgery agent
from neurosurgery_agent.agent import query_neurosurgery_agent

# Initialize FastAPI app
app = FastAPI(
    title="Neurosurgery AI Backend",
    description="FastAPI backend for neurosurgery AI chat using Google ADK",
    version="1.0.0"
)

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
        
        # Query the neurosurgery agent
        result = await query_neurosurgery_agent(
            question=request.query.strip(),
            session_id=session_id
        )
        
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


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with basic API information."""
    return {
        "message": "Neurosurgery AI Backend",
        "docs": "/docs",
        "health": "/health",
        "chat_endpoint": "/api/chat"
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