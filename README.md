# Neurosurgery AI Chat Application

A Next.js chat application for neurosurgery assistance powered by Google ADK and FastAPI backend.

## Architecture

- **Frontend**: Next.js with React components
- **Backend**: FastAPI server with Google ADK agents
- **AI**: Google Gemini 2.0 Flash via Google ADK

## Quick Start

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Setup backend:**
   ```bash
   npm run backend:install
   ```

3. **Configure environment:**
   - Update `backend/.env` with your Google API key
   - Get your key from [Google AI Studio](https://aistudio.google.com/apikey)

4. **Run both frontend and backend:**
   ```bash
   npm run dev:full
   ```

   Or run separately:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run backend:dev
   ```

## Project Structure

```
├── src/                    # Next.js frontend
│   ├── app/
│   │   ├── actions.ts     # Server actions (calls FastAPI)
│   │   └── page.tsx       # Main chat interface
│   └── components/        # React components
├── backend/               # FastAPI backend
│   ├── neurosurgery_agent/
│   │   ├── __init__.py
│   │   └── agent.py       # Google ADK agent
│   ├── main.py           # FastAPI server
│   ├── requirements.txt  # Python dependencies
│   └── .env             # Environment variables
└── package.json          # Node.js dependencies
```

## Development

- Frontend runs on http://localhost:9002
- Backend runs on http://localhost:8001
- Backend API docs available at http://localhost:8001/docs
