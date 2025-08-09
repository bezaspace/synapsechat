'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { askQuestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Send } from 'lucide-react';
import { ChatMessage } from '@/components/chat-message';
import { LoadingMessage } from '@/components/loading-message';
import { useToast } from '@/hooks/use-toast';

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

  const handleExportChat = () => {
    if (messages.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Cannot export empty chat',
        description: 'Please ask some questions before exporting.',
      });
      return;
    }

    const chatContent = messages
      .map((msg) => {
        const prefix = msg.role === 'user' ? 'You' : 'SynapseChat';
        let content = `${prefix}:\n${msg.content}\n`;
        if (msg.source) {
          content += `Source: ${msg.source}\n`;
        }
        return content;
      })
      .join('\n---\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `synapse-chat-export-${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
    <main className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
        <h1 className="text-xl font-bold">SynapseChat</h1>
        <Button variant="ghost" size="icon" onClick={handleExportChat} aria-label="Export chat">
          <Download className="h-5 w-5" />
        </Button>
      </header>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 px-4 py-6 sm:px-6">
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
  );
}
