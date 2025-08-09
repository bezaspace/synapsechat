'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { askQuestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot } from 'lucide-react';
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

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentInput = input.trim();
    if (!currentInput || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await askQuestion(currentInput);
      const assistantMessage: Message = { id: crypto.randomUUID(), role: 'assistant', ...response };
      setMessages((prev) => [...prev, assistantMessage]);
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
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <h1 className="text-lg font-semibold">SynapseChat</h1>
          </div>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
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
                {messages.length === 0 && !isLoading && (
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
                )}
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
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
