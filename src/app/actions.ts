'use server';

import type { Message } from '@/lib/types';

// Backend API configuration
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8001';

// Types for API communication
export interface NeurosurgeryQueryOutput {
  content: string;
  source?: string;
  session_id?: string;
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

interface ChatHistoryResponse {
  messages: Message[];
  session_id: string;
}

export interface SessionSummary {
  session_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

interface UserSessionsResponse {
  sessions: SessionSummary[];
}

export async function askQuestion(query: string, sessionId?: string): Promise<NeurosurgeryQueryOutput> {
  if (!query || !query.trim()) {
    throw new Error('Query cannot be empty');
  }

  try {
    // Prepare the request payload
    const requestBody: ChatRequest = {
      query: query.trim(),
      session_id: sessionId
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
      session_id: data.session_id
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

export async function loadChatHistory(sessionId: string): Promise<Message[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load chat history: ${response.status}`);
    }

    const data: ChatHistoryResponse = await response.json();
    return data.messages;

  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
}

export async function getUserSessions(userId: string = 'anonymous'): Promise<SessionSummary[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/sessions?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load user sessions: ${response.status}`);
    }

    const data: UserSessionsResponse = await response.json();
    return data.sessions;

  } catch (error) {
    console.error('Error loading user sessions:', error);
    return [];
  }
}

export async function deleteSession(sessionId: string, userId: string = 'anonymous'): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat/${sessionId}?user_id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete session: ${response.status}`);
    }

    return true;

  } catch (error) {
    console.error('Error deleting session:', error);
    return false;
  }
}
