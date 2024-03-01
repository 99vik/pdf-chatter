import { Send, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function FailedFileChat() {
  return (
    <div className="bg-red-50 flex flex-col col-span-2 border-l border-zinc-200 max-h-[calc(70vh)] md:max-h-[calc(100vh-61.6px)]">
      <div className="flex-1 p-1 sm:p-3 flex flex-col justify-center items-center gap-4">
        <XCircle size={50} className="text-red-800" />
        <p className="text-red-900 font-semibold">
          Failed to process this file, try to reupload again later.
        </p>
      </div>
      <div className="border-t p-2 sm:p-3 bg-neutral-50">
        <form className="relative">
          <textarea
            disabled
            name="messageInput"
            placeholder="Ask a question about the document..."
            className="resize-none pr-14 flex h-[calc(36px+16px)] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button disabled size="sm" className="absolute right-2 bottom-2 ">
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}
