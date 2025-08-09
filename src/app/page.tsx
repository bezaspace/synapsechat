'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { askQuestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">SynapseChat</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleExportChat} aria-label="Export chat">
            <Download className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-6 p-1 sm:p-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingMessage />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
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
        </CardFooter>
      </Card>
    </main>
  );
}
