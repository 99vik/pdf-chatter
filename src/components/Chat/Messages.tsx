import Message from './Message';

interface Message {
  id: string;
  body: string;
  userId: string | null;
  fileId: string | null;
  createdAt: string;
}

export default function Messages({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  if (!messages) return <p>Loading</p>;

  const messagesDisplayed = messages.map((message) => (
    <Message
      key={message.id}
      message={{ ...message, createdAt: new Date(message.createdAt) }}
    />
  ));

  return <>{messagesDisplayed}</>;
}
