'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { DocumentUpload } from '@/components/DocumentUpload';
import { DocumentList } from '@/components/DocumentList';
import { getDocuments, uploadDocument, deleteDocument } from '@/app/actions';

export interface Document {
  id: string;
  filename: string;
  file_size: number;
  mime_type: string;
  created_at: string;
  updated_at: string;
}

export default function LibraryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const result = await uploadDocument(file);
      
      if (result.success && result.document) {
        setDocuments(prev => [result.document!, ...prev]);
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || 'Upload failed' };
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      return { success: false, message: 'Failed to upload document' };
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      const success = await deleteDocument(documentId);
      
      if (success) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        return true;
      } else {
        console.error('Failed to delete document');
        return false;
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      return false;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <MessageSquare className="w-4 h-4" />
          Back to Chat
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Library</h1>
        <p className="text-gray-600">
          Upload documents to enhance your AI chat with personalized knowledge. 
          Supported formats: Text files (.txt, .md, .csv)
        </p>
      </div>

      <div className="space-y-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Document</h2>
          <DocumentUpload 
            onUpload={handleUpload} 
            uploading={uploading}
          />
        </div>

        {/* Documents List Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Documents</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading documents...</span>
            </div>
          ) : (
            <DocumentList 
              documents={documents} 
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}