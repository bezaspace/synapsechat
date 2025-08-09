'use server';

// Backend API configuration
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8001';

// Types for API communication
export interface NeurosurgeryQueryOutput {
  content: string;
  source?: string;
}

interface ChatRequest {
  query: string;
  session_id?: string;
}

interface ChatResponse {
  answer: string;
  source?: string;
  session_id: string;
}

export async function askQuestion(query: string): Promise<NeurosurgeryQueryOutput> {
  if (!query || !query.trim()) {
    throw new Error('Query cannot be empty');
  }

  try {
    // Prepare the request payload
    const requestBody: ChatRequest = {
      query: query.trim(),
      // Optional: You can add session management here if needed
      // session_id: generateSessionId()
    };

    // Make the API call to the FastAPI backend
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        `Backend request failed with status ${response.status}`
      );
    }

    // Parse the response
    const data: ChatResponse = await response.json();

    // Return in the expected format
    return {
      content: data.answer,
      source: data.source,
    };

  } catch (error) {
    console.error('Error calling FastAPI backend:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        return { 
          content: 'Unable to connect to the AI service. Please check if the backend server is running and try again.' 
        };
      }
      return { 
        content: `Sorry, I encountered an error: ${error.message}. Please try again later.` 
      };
    }
    
    return { 
      content: 'Sorry, I encountered an unexpected error while processing your request. Please try again later.' 
    };
  }
}
