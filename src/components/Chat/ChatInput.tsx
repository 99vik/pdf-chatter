'use client';

import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useContext, useRef, useState } from 'react';
import { ChatContext } from '.';
import { trpc } from '@/app/_trpc/client';
import { useToast } from '../ui/use-toast';

function SubmitButton({
  inputLength,
  isPending,
}: {
  inputLength: number;
  isPending: boolean;
}) {
  return (
    <Button
      disabled={isPending || inputLength === 0}
      type="submit"
      size="sm"
      className="absolute right-2 bottom-2 "
    >
      <Send size={20} />
    </Button>
  );
}

export default function ChatInput({ fileid }: { fileid: string }) {
  const [inputLength, setInputLength] = useState(0);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { refreshMessages, simulateMessageResponse } = useContext(ChatContext);
  const { toast } = useToast();

  const { mutate: send, isPending } = trpc.sendMessage.useMutation({
    onSuccess: () => {
      console.log('done');
      refreshMessages();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem processing your message.',
      });
      refreshMessages();
    },
  });

  async function handleSendMessage(data: FormData) {
    const message = data.get('messageInput') as string;
    simulateMessageResponse(data);
    setInputLength(0);
    ref.current!.value = '';

    send({ fileid, message });
  }
  return (
    <div className="border-t p-2 sm:p-3 bg-neutral-50">
      <form
        action={(data) => {
          handleSendMessage(data);
        }}
        className="relative"
      >
        <Textarea
          disabled={isPending}
          ref={ref}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setInputLength(target.value.length);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              // @ts-ignore
              e.target.nextElementSibling.click();
            }
          }}
          name="messageInput"
          placeholder="Ask a question about the document..."
          maxRows={8}
          rows={2}
          autoFocus
          className="resize-none pr-14 scrollbar-thin scrollbar-primary "
        />
        <SubmitButton isPending={isPending} inputLength={inputLength} />
      </form>
    </div>
  );
}
