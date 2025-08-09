"""
Neurosurgery AI Agent using Google ADK

This agent specializes in answering neurosurgery-related questions using
Google's Agent Development Kit (ADK) with Gemini models.
"""

import os
from google.adk.agents import Agent
from typing import Dict, Any

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Set up Google API key as environment variable for ADK
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY", "")

# Create the main neurosurgery agent following ADK best practices
root_agent = Agent(
    name="neurosurgery_specialist",
    model="gemini-2.0-flash",
    description="Specialized AI assistant for neurosurgery information and guidance",
    instruction="""You are a specialized AI assistant for neurosurgery.

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
)


async def query_neurosurgery_agent(question: str, session_id: str = "default") -> Dict[str, Any]:
    """
    Query the neurosurgery agent with a question.
    
    Args:
        question: The neurosurgery-related question
        session_id: Session identifier for conversation continuity
        
    Returns:
        Dictionary containing the response and metadata
    """
    try:
        from google.adk.sessions import InMemorySessionService
        from google.adk import Runner
        from google.genai import types
        
        # Create session service and runner
        session_service = InMemorySessionService()
        app_name = "neurosurgery_app"
        user_id = "user_1"
        
        # Create session
        session = session_service.create_session(
            app_name=app_name,
            user_id=user_id,
            session_id=session_id
        )
        
        # Create runner
        runner = Runner(
            agent=root_agent,
            app_name=app_name,
            session_service=session_service
        )
        
        # Prepare the user's message in ADK format
        content = types.Content(role='user', parts=[types.Part(text=question)])
        
        # Run the agent and collect the final response
        final_response_text = "Agent did not produce a final response."
        
        async for event in runner.run_async(user_id=user_id, session_id=session_id, new_message=content):
            if event.is_final_response():
                if event.content and event.content.parts:
                    final_response_text = event.content.parts[0].text
                elif event.actions and event.actions.escalate:
                    final_response_text = f"Agent escalated: {event.error_message or 'No specific message.'}"
                break
        
        return {
            "answer": final_response_text,
            "source": "Neurosurgery AI Agent with Google ADK",
            "session_id": session_id
        }
        
    except Exception as e:
        # Handle errors gracefully
        return {
            "answer": f"I apologize, but I encountered an error while processing your neurosurgery question: {str(e)}. Please try again or rephrase your question.",
            "source": "Error handling",
            "session_id": session_id,
            "error": str(e)
        }