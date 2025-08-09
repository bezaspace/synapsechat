'use client';

import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          'max-w-[80%] space-y-2 rounded-lg px-4 py-2 shadow-sm',
          isAssistant ? 'bg-card' : 'bg-primary text-primary-foreground'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        {source && (
          <div className="mt-2 border-t border-border/50 pt-2">
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
