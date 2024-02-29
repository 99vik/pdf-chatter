'use client';

import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { sendMessage } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

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
  async function handleSendMessage(data: FormData) {
    const res = await sendMessage(data);
    console.log(res);
  }
  return (
    <div className="border-t p-2 sm:p-3 bg-neutral-50">
      <form
        action={async (data) => handleSendMessage(data)}
        className="relative"
      >
        <input type="hidden" name="fileid" value={fileid} />
        <Textarea
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setInputLength(target.value.length);
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
