import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';

export function LoadingMessage() {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8 shrink-0 border">
        <AvatarFallback className="bg-accent text-accent-foreground">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[80%] space-y-2 rounded-lg bg-card px-4 py-2">
        <div className="flex items-center gap-1.5">
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
