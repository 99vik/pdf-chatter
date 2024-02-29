'use client';

import { trpc } from '@/app/_trpc/client';
import ChatInput from './ChatInput';
import Messages from './Messages';

export default function Chat({ fileid }: { fileid: string }) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        id: fileid,
        limit: 8,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    );
  const messages = data?.pages.flatMap((page) => page.messages);

  return (
    <div className="bg-white flex flex-col col-span-2 border-l border-zinc-200 max-h-[calc(70vh)] md:max-h-[calc(100vh-61.6px)]">
      <div className="flex-1 p-1 sm:p-3 flex flex-col-reverse gap-4 overflow-y-scroll scrollbar-thin scrollbar-primary">
        <Messages
          messages={messages}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>

      <ChatInput fileid={fileid} />
    </div>
  );
}
