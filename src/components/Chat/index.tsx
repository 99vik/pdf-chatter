'use client';

import { trpc } from '@/app/_trpc/client';
import ChatInput from './ChatInput';
import Messages from './Messages';

export default function Chat({ fileid }: { fileid: string }) {
  const { data: messages, isLoading } = trpc.getFileMessages.useQuery({
    id: fileid,
  });

  return (
    <div className="bg-white flex flex-col col-span-2 border-l border-zinc-200 ">
      <div className="flex-1 p-3 flex flex-col gap-3">
        <Messages messages={messages} />
      </div>
      <ChatInput fileid={fileid} />
    </div>
  );
}
