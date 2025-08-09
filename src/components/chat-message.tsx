'use client';

import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Function to render markdown-like formatting naturally
function formatAIResponse(text: string): JSX.Element {
  // Process the text to handle common markdown patterns without forcing structure
  let processedText = text
    // Handle bold text: **text** becomes bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Handle italic text: *text* becomes italic (but not if it's a bullet point)
    .replace(/(?<!\s)\*([^*\n]+)\*(?!\s)/g, '<em>$1</em>')
    // Clean up bullet points to use proper bullet character
    .replace(/^\s*[\*\-]\s+/gm, '• ')
    // Preserve line breaks and paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');

  // Wrap in paragraph tags if not already wrapped
  if (!processedText.includes('<p>')) {
    processedText = `<p>${processedText}</p>`;
  } else {
    processedText = `<p>${processedText}</p>`;
  }

  return (
    <div 
      className="text-sm leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0"
      dangerouslySetInnerHTML={{ __html: processedText }}
    />
  );
}

export function ChatMessage({ message }: { message: Message }) {
  const { role, content, source } = message;
  const isAssistant = role === 'assistant';

  return (
    <div className={cn('flex items-start gap-3', !isAssistant && 'justify-end')}>
      {isAssistant && (
        <Avatar className="h-8 w-8 shrink-0 border">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] space-y-2 rounded-lg px-4 py-3 shadow-sm',
          isAssistant ? 'bg-card border' : 'bg-primary text-primary-foreground'
        )}
      >
        {isAssistant ? formatAIResponse(content) : (
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
        )}
        {source && (
          <div className="mt-3 border-t border-border/50 pt-2">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Source:</span> {source}
            </p>
          </div>
        )}
      </div>
      {!isAssistant && (
        <Avatar className="h-8 w-8 shrink-0 border">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
