import { useContext, useEffect } from 'react';
import Message from './Message';
import { useInView } from 'react-intersection-observer';
import { Bot, Loader2 } from 'lucide-react';
import MessageType from './MessageType';
import { ChatContext } from '.';

export default function Messages({
  fetchNextPage,
  hasNextPage,
}: {
  messages: MessageType[] | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) {
  const [ref, inView] = useInView();
  const { messages, addedMessages } = useContext(ChatContext);
  useEffect(() => {
    function nextPage() {
      if (inView && hasNextPage) fetchNextPage();
    }
    nextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (!messages)
    return (
      <div className="bg-white h-full flex-col col-span-2 flex items-center justify-center">
        <Loader2 size={50} className="animate-spin text-primary" />
      </div>
    );

  let messagesDisplayed = messages.map((message) => (
    <Message
      key={message.id}
      message={{ ...message, createdAt: new Date(message.createdAt) }}
    />
  ));

  if (addedMessages) {
    const displayedAddedeMessages = addedMessages.map((message, index) => (
      // @ts-ignore
      <Message key={index} message={addedMessages[index]} />
    ));
    messagesDisplayed.unshift(...displayedAddedeMessages);
  }
  return (
    <>
      {messagesDisplayed.length !== 0 ? (
        messagesDisplayed
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center">
          <Bot className="text-zinc-400 mb-1" strokeWidth={1.25} size={50} />
          <p className="text-zinc-400 font-semibold">How can I assist you?.</p>
        </div>
      )}
      <div ref={ref} />
    </>
  );
}
