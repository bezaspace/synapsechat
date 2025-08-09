'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { askQuestion, loadChatHistory, getUserSessions, deleteSession, type SessionSummary } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { ChatMessage } from '@/components/chat-message';
import { LoadingMessage } from '@/components/loading-message';
import { useToast } from '@/hooks/use-toast';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load sessions and chat history on component mount
  useEffect(() => {
    const initializeChat = async () => {
      // Load all user sessions first
      try {
        const userSessions = await getUserSessions();
        setSessions(userSessions);
        
        // Get or create session ID
        let currentSessionId = localStorage.getItem('chat_session_id');
        
        // If no stored session or stored session doesn't exist in sessions, create new one
        if (!currentSessionId || !userSessions.find(s => s.session_id === currentSessionId)) {
          if (userSessions.length > 0) {
            // Use the most recent session
            currentSessionId = userSessions[0].session_id;
          } else {
            // Create new session
            currentSessionId = crypto.randomUUID();
          }
          localStorage.setItem('chat_session_id', currentSessionId);
        }
        
        setSessionId(currentSessionId);

        // Load existing chat history for current session
        const history = await loadChatHistory(currentSessionId);
        setMessages(history);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      } finally {
        setIsLoadingHistory(false);
        setIsLoadingSessions(false);
      }
    };

    initializeChat();
  }, []);

  const startNewChat = () => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    setMessages([]);
    localStorage.setItem('chat_session_id', newSessionId);
  };

  const switchToSession = async (targetSessionId: string) => {
    if (targetSessionId === sessionId) return;
    
    setIsLoadingHistory(true);
    try {
      const history = await loadChatHistory(targetSessionId);
      setMessages(history);
      setSessionId(targetSessionId);
      localStorage.setItem('chat_session_id', targetSessionId);
    } catch (error) {
      console.error('Failed to switch session:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load chat history.',
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const refreshSessions = async () => {
    try {
      const userSessions = await getUserSessions();
      setSessions(userSessions);
    } catch (error) {
      console.error('Failed to refresh sessions:', error);
    }
  };

  const handleDeleteSession = async (sessionIdToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent switching to the session when clicking delete
    
    try {
      const success = await deleteSession(sessionIdToDelete);
      
      if (success) {
        // Remove from sessions list
        setSessions(prev => prev.filter(s => s.session_id !== sessionIdToDelete));
        
        // If we deleted the current session, switch to another one or create new
        if (sessionIdToDelete === sessionId) {
          const remainingSessions = sessions.filter(s => s.session_id !== sessionIdToDelete);
          if (remainingSessions.length > 0) {
            // Switch to the most recent remaining session
            const nextSession = remainingSessions[0];
            await switchToSession(nextSession.session_id);
          } else {
            // No sessions left, start a new chat
            startNewChat();
          }
        }
        
        toast({
          title: 'Chat deleted',
          description: 'The chat has been successfully deleted.',
        });
      } else {
        throw new Error('Failed to delete session');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete the chat. Please try again.',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentInput = input.trim();
    if (!currentInput || isLoading || !sessionId) return;

    setIsLoading(true);
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await askQuestion(currentInput, sessionId);
      const assistantMessage: Message = { 
        id: crypto.randomUUID(), 
        role: 'assistant', 
        content: response.content,
        source: response.source
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Update session ID if it changed
      if (response.session_id && response.session_id !== sessionId) {
        setSessionId(response.session_id);
        localStorage.setItem('chat_session_id', response.session_id);
      }
      
      // Refresh sessions list to show new/updated session
      refreshSessions();
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a response from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h1 className="text-lg font-semibold">SynapseChat</h1>
            </div>
            <Button
              onClick={startNewChat}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              title="New Chat"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <ScrollArea className="flex-1">
            <div className="space-y-1 py-2">
              {isLoadingSessions ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Loading chats...
                </div>
              ) : sessions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No previous chats
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.session_id}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md hover:bg-accent transition-colors cursor-pointer",
                      session.session_id === sessionId && "bg-accent"
                    )}
                    onClick={() => switchToSession(session.session_id)}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">
                        {session.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.message_count} messages
                      </div>
                    </div>
                    <Button
                      onClick={(e) => handleDeleteSession(session.session_id, e)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      title="Delete chat"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex h-screen flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1"></div>
          </header>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-6 px-4 py-6 sm:px-6">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center h-full pt-24">
                    <div className="text-center">
                      <Bot className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Loading chat history...
                      </p>
                    </div>
                  </div>
                ) : messages.length === 0 && !isLoading ? (
                  <div className="flex items-center justify-center h-full pt-24">
                    <div className="text-center">
                      <Bot className="mx-auto h-12 w-12 text-gray-400" />
                      <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-50">
                        Welcome to SynapseChat
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ask me anything about neurosurgery.
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))
                )}
                {isLoading && <LoadingMessage />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
          <div className="border-t bg-card px-4 py-3 sm:px-6">
            <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a neurosurgery question..."
                disabled={isLoading}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
