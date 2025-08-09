# Neurosurgery AI Backend

FastAPI backend for the neurosurgery chat application using Google ADK (Agent Development Kit).

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment variables:**
   - Copy `.env` and update with your Google API key
   - Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

3. **Update .env file:**
   ```env
   GOOGLE_GENAI_USE_VERTEXAI=FALSE
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

## Running the Server

### Development Mode
```bash
python main.py
```

### Using ADK Tools (Optional)
You can also use Google ADK's built-in tools for development:

```bash
# Run with ADK web UI for debugging
adk web

# Run with ADK API server
adk api_server
```

## API Endpoints

- `GET /` - Root endpoint with API information
- `GET /health` - Health check
- `POST /api/chat` - Main chat endpoint

### Chat Endpoint Usage

```bash
curl -X POST http://localhost:8001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What is a craniotomy?"}'
```

## Architecture

- **FastAPI**: Web framework for the API server
- **Google ADK**: Agent Development Kit for AI agent implementation
- **Gemini 2.0 Flash**: Language model for responses
- **Custom Tools**: Neurosurgery knowledge retrieval tool

## Development

The agent is defined in `neurosurgery_agent/agent.py` and follows Google ADK best practices:
- Uses `LlmAgent` for conversational AI
- Implements custom `FunctionTool` for knowledge retrieval
- Includes proper error handling and session management