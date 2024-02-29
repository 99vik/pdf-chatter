import { useEffect } from 'react';
import Message from './Message';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

interface Message {
  id: string;
  body: string;
  userId: string | null;
  fileId: string | null;
  createdAt: string;
}

export default function Messages({
  messages,
  fetchNextPage,
  hasNextPage,
}: {
  messages: Message[] | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) {
  const [ref, inView] = useInView();

  useEffect(() => {
    function nextPage() {
      if (inView && hasNextPage) fetchNextPage();
    }
    nextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (!messages)
    return (
      <div className="bg-white h-full flex-col col-span-2 border-l border-zinc-200 flex items-center justify-center">
        <Loader2 size={50} className="animate-spin text-primary" />
      </div>
    );

  const messagesDisplayed = messages.map((message) => (
    <Message
      key={message.id}
      message={{ ...message, createdAt: new Date(message.createdAt) }}
    />
  ));

  return (
    <>
      {messagesDisplayed}
      <div ref={ref} />
    </>
  );
}
