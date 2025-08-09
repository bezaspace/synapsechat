# RAG System Setup Guide

## Overview
This guide will help you set up the RAG (Retrieval Augmented Generation) system that enhances your neurosurgery AI chat with document-based knowledge.

## Prerequisites
- Supabase project (existing from chat setup)
- Google API key (existing from ADK setup)

## Database Setup

### 1. Enable pgvector Extension
In your Supabase SQL editor, run:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 2. Run the Updated Schema
Execute the complete schema from `sql/schema.sql` in your Supabase SQL editor. This will:
- Create the `documents` table for storing uploaded files
- Create the `document_chunks` table with vector embeddings
- Add the vector similarity search function
- Set up proper indexes for fast retrieval

## Backend Dependencies
The required dependencies are already added to `requirements.txt`:
- `google-genai` - For Gemini embeddings
- `numpy` - For vector operations
- `scikit-learn` - For similarity calculations

Install them with:
```bash
cd backend
pip install -r requirements.txt
```

## Environment Variables
Make sure your `backend/.env` file has:
```env
GOOGLE_API_KEY=your_google_api_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How It Works

### Document Processing
1. Users upload text files through the library page
2. Documents are chunked into ~500 word segments with overlap
3. Each chunk is embedded using Gemini's `gemini-embedding-001` model
4. Embeddings are stored in Supabase with pgvector

### RAG Retrieval
1. When users ask questions, the query is embedded
2. Vector similarity search finds relevant document chunks
3. Top matching chunks are added as context to the AI agent
4. The agent provides enhanced responses based on your documents

### Supported File Types
- Text files (.txt)
- Markdown files (.md)
- CSV files (.csv)

## Usage

### Upload Documents
1. Navigate to the Document Library page
2. Drag and drop or select text files
3. Files are automatically processed and embedded

### Enhanced Chat
- Ask questions normally in the chat
- If relevant documents exist, responses will be enhanced with "Enhanced with your documents" indicator
- The AI will reference specific documents when providing answers

## Features

### Vector Search
- Uses cosine similarity for semantic matching
- 768-dimensional embeddings for optimal performance
- Automatic normalization for accurate similarity scores

### Document Management
- View all uploaded documents
- Delete documents (removes embeddings automatically)
- File size and upload date tracking

### RAG Context
- Retrieves top 3 most relevant chunks per query
- Includes document names in context
- Fallback to general knowledge when no relevant docs found

## Troubleshooting

### Common Issues
1. **Upload fails**: Ensure file is text-based and under 10MB
2. **No enhanced responses**: Check if documents contain relevant content
3. **Slow responses**: Vector search may take time with many documents

### Database Issues
- Ensure pgvector extension is enabled
- Check that vector indexes are created properly
- Verify Supabase connection credentials

## Next Steps
- Upload your neurosurgery documents, research papers, or notes
- Test the enhanced responses with domain-specific questions
- Monitor the "Enhanced with your documents" indicator in responses