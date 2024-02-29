'use client';

import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { sendMessage } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { useContext, useRef, useState } from 'react';
import { ChatContext } from '.';

const initialState = {
  message: '',
};

function SubmitButton({ inputLength }: { inputLength: number }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || inputLength === 0}
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
  const [waitingResponse, setWaitingResponse] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { refreshMessages, simulateMessageResponse } = useContext(ChatContext);

  async function handleSendMessage(data: FormData) {
    setWaitingResponse(true);
    ref.current!.value = '';
    // const res = await sendMessage(data);
    // refreshMessages();
    setWaitingResponse(false);
    // console.log(res);
  }
  return (
    <div className="border-t p-2 sm:p-3 bg-neutral-50">
      <form
        action={(data) => {
          simulateMessageResponse(data);
          handleSendMessage(data);
        }}
        className="relative"
      >
        <input type="hidden" name="fileid" value={fileid} />
        <Textarea
          disabled={waitingResponse}
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
        <SubmitButton inputLength={inputLength} />
      </form>
    </div>
  );
}
