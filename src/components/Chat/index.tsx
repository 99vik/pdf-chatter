'use client';

import { trpc } from '@/app/_trpc/client';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { useState, createContext, useContext } from 'react';
import MessageType from './MessageType';

export const ChatContext = createContext({
  messages: [] as MessageType[] | undefined,
  refreshMessages: () => {},
  simulateMessageResponse: (data: FormData) => {},
  addedMessages: [] as MessageType[] | undefined,
});

export default function Chat({ fileid }: { fileid: string }) {
  const { data, fetchNextPage, hasNextPage, isPending } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        id: fileid,
        limit: 8,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    );
  const utils = trpc.useUtils();
  const messages = data?.pages.flatMap((page) => page.messages);

  const [addedMessages, setAddedMessages] = useState<MessageType[] | undefined>(
    undefined
  );

  async function refreshMessages() {
    await utils.getFileMessages.invalidate();
    setAddedMessages(undefined);
  }

  function simulateMessageResponse(data: FormData) {
    const userMessage: MessageType = {
      userId: 'fake-id',
      // @ts-ignore
      body: data.get('messageInput'),
    };
    setAddedMessages([userMessage]);
    setTimeout(() => {
      // @ts-ignore
      setAddedMessages([{ body: undefined }, userMessage]);
    }, 750);
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        addedMessages,
        refreshMessages,
        simulateMessageResponse,
      }}
    >
      <div className="bg-white flex flex-col col-span-2 border-l border-t-2 md:border-t-0 border-zinc-200 max-h-[calc(70vh)] md:max-h-[calc(100vh-61.6px)]">
        <div className="flex-1 p-2 sm:p-3 flex flex-col-reverse gap-4 overflow-y-scroll scrollbar-thin scrollbar-primary">
          <Messages
            messages={messages}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>

        <ChatInput fileid={fileid} />
      </div>
    </ChatContext.Provider>
  );
}
