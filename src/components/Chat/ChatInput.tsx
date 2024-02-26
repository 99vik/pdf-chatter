'use client';

import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function ChatInput() {
  return (
    <div className="border-t p-3 bg-neutral-100">
      <div className="relative">
        <Textarea
          placeholder="Ask a question about document..."
          maxRows={8}
          rows={2}
          autoFocus
          className="resize-none pr-14 scrollbar-thin scrollbar-primary"
        />
        <Button size="sm" className="absolute right-2 bottom-2 ">
          <Send size={20}></Send>
        </Button>
      </div>
    </div>
  );
}
