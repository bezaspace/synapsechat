"""
Supabase Database Service for Chat History

Handles all database operations for storing and retrieving chat sessions.
"""

import os
import json
from typing import List, Dict, Any, Optional
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class DatabaseService:
    def __init__(self):
        """Initialize Supabase client."""
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_ANON_KEY")
        
        if not supabase_url or not supabase_key:
            raise ValueError("SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables")
        
        self.supabase: Client = create_client(supabase_url, supabase_key)
    
    async def save_chat_session(self, session_id: str, messages: List[Dict[str, Any]], user_id: str = "anonymous") -> bool:
        """
        Save or update a chat session with messages.
        
        Args:
            session_id: Unique session identifier
            messages: List of message objects
            user_id: User identifier (default: "anonymous")
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Try to update existing session first
            result = self.supabase.table("chat_sessions").update({
                "messages": messages,
                "updated_at": "NOW()"
            }).eq("session_id", session_id).execute()
            
            # If no rows were updated, create new session
            if not result.data:
                result = self.supabase.table("chat_sessions").insert({
                    "session_id": session_id,
                    "user_id": user_id,
                    "messages": messages
                }).execute()
            
            return True
            
        except Exception as e:
            print(f"Error saving chat session: {e}")
            return False
    
    async def load_chat_session(self, session_id: str) -> Optional[List[Dict[str, Any]]]:
        """
        Load messages for a specific chat session.
        
        Args:
            session_id: Unique session identifier
            
        Returns:
            List of message objects or None if session not found
        """
        try:
            result = self.supabase.table("chat_sessions").select("messages").eq("session_id", session_id).execute()
            
            if result.data and len(result.data) > 0:
                return result.data[0]["messages"]
            
            return None
            
        except Exception as e:
            print(f"Error loading chat session: {e}")
            return None
    
    async def get_user_sessions(self, user_id: str = "anonymous") -> List[Dict[str, Any]]:
        """
        Get all sessions for a user (for future sidebar implementation).
        
        Args:
            user_id: User identifier
            
        Returns:
            List of session metadata
        """
        try:
            result = self.supabase.table("chat_sessions").select(
                "session_id, created_at, updated_at"
            ).eq("user_id", user_id).order("updated_at", desc=True).execute()
            
            return result.data or []
            
        except Exception as e:
            print(f"Error getting user sessions: {e}")
            return []
    
    async def delete_chat_session(self, session_id: str, user_id: str = "anonymous") -> bool:
        """
        Delete a specific chat session.
        
        Args:
            session_id: Unique session identifier
            user_id: User identifier (for security)
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            result = self.supabase.table("chat_sessions").delete().eq(
                "session_id", session_id
            ).eq("user_id", user_id).execute()
            
            return True
            
        except Exception as e:
            print(f"Error deleting chat session: {e}")
            return False

# Global database service instance
db_service = DatabaseService()