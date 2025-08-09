"""
Neurosurgery AI Agent using Google ADK with RAG Support

This agent specializes in answering neurosurgery-related questions using
Google's Agent Development Kit (ADK) with Gemini models and RAG functionality.
"""

import os
from google.adk.agents import Agent
from typing import Dict, Any, Optional

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Set up Google API key as environment variable for ADK
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY", "")

def create_neurosurgery_agent(context: Optional[str] = None) -> Agent:
    """
    Create a neurosurgery agent with optional RAG context.
    
    Args:
        context: Optional context from RAG system
        
    Returns:
        Configured Agent instance
    """
    base_instruction = """You are a specialized AI assistant for neurosurgery.

Your role is to provide accurate, helpful information about:
- Neurosurgical procedures and techniques
- Brain and spinal cord conditions
- Treatment options and surgical approaches
- Recovery and rehabilitation processes
- Medical terminology and concepts

Guidelines:
1. Provide clear, accurate, and well-structured responses
2. Include relevant medical context when appropriate
3. Emphasize that your responses are for informational purposes only
4. Recommend consulting with medical professionals for specific cases
5. Always prioritize patient safety and accurate medical information
6. Write naturally and conversationally while maintaining medical accuracy

Remember: Your responses are for informational purposes only and should not replace professional medical advice."""

    # Add RAG context if provided
    if context and context.strip():
        instruction = f"{context}\n\n{base_instruction}"
    else:
        instruction = base_instruction

    return Agent(
        name="neurosurgery_specialist",
        model="gemini-2.0-flash",
        description="Specialized AI assistant for neurosurgery information and guidance",
        instruction=instruction
    )

# Create the default agent without context
root_agent = create_neurosurgery_agent()


async def query_neurosurgery_agent(question: str, session_id: str = "default", user_id: str = "anonymous") -> Dict[str, Any]:
    """
    Query the neurosurgery agent with a question, using RAG context when available.
    
    Args:
        question: The neurosurgery-related question
        session_id: Session identifier for conversation continuity
        user_id: User ID for RAG context retrieval
        
    Returns:
        Dictionary containing the response and metadata
    """
    try:
        from google.adk.sessions import InMemorySessionService
        from google.adk import Runner
        from google.genai import types
        
        # Import RAG service for context retrieval
        from database import db_service
        from rag_service import RAGService
        
        # Get RAG context for the question
        rag_service = RAGService(db_service.supabase)
        rag_context = await rag_service.get_rag_context(question, user_id)
        
        # Create agent with RAG context
        agent = create_neurosurgery_agent(rag_context)
        
        # Create session service and runner
        session_service = InMemorySessionService()
        app_name = "neurosurgery_app"
        adk_user_id = "user_1"
        
        # Create session
        session = session_service.create_session(
            app_name=app_name,
            user_id=adk_user_id,
            session_id=session_id
        )
        
        # Create runner
        runner = Runner(
            agent=agent,
            app_name=app_name,
            session_service=session_service
        )
        
        # Prepare the user's message in ADK format
        content = types.Content(role='user', parts=[types.Part(text=question)])
        
        # Run the agent and collect the final response
        final_response_text = "Agent did not produce a final response."
        
        async for event in runner.run_async(user_id=adk_user_id, session_id=session_id, new_message=content):
            if event.is_final_response():
                if event.content and event.content.parts:
                    final_response_text = event.content.parts[0].text
                elif event.actions and event.actions.escalate:
                    final_response_text = f"Agent escalated: {event.error_message or 'No specific message.'}"
                break
        
        # Add context indicator if RAG was used
        source = "Neurosurgery AI Agent with Google ADK"
        if rag_context:
            source += " (Enhanced with your documents)"
        
        return {
            "answer": final_response_text,
            "source": source,
            "session_id": session_id,
            "rag_context_used": bool(rag_context)
        }
        
    except Exception as e:
        # Handle errors gracefully
        return {
            "answer": f"I apologize, but I encountered an error while processing your neurosurgery question: {str(e)}. Please try again or rephrase your question.",
            "source": "Error handling",
            "session_id": session_id,
            "error": str(e)
        }