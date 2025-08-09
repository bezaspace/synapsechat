# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

## 2. Create Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `sql/schema.sql`
3. Run the SQL to create the `chat_sessions` table

## 3. Get Your Credentials

1. Go to Settings → API in your Supabase dashboard
2. Copy your Project URL and anon/public key

## 4. Configure Environment Variables

### Backend (.env)
Update `backend/.env` with your Supabase credentials:
```
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
```

### Frontend (.env.local)
Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Install Dependencies

```bash
# Frontend
npm install

# Backend
npm run backend:install
```

## 6. Run the Application

```bash
npm run dev:full
```

## Features Implemented

✅ **Chat History Persistence**: All conversations are saved to Supabase
✅ **Session Management**: Each chat session has a unique ID stored in localStorage
✅ **Automatic Loading**: Chat history loads when you refresh the page
✅ **Real-time Updates**: Messages are saved immediately after each exchange
✅ **Error Handling**: Graceful fallbacks if database is unavailable

## Database Schema

The `chat_sessions` table stores:
- `id`: UUID primary key
- `user_id`: User identifier (defaults to "anonymous")
- `session_id`: Unique session identifier
- `messages`: JSONB array of all messages in the conversation
- `created_at` / `updated_at`: Timestamps

## API Endpoints

- `POST /api/chat` - Send a message and get AI response
- `GET /api/chat/{session_id}` - Load chat history for a session