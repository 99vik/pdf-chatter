import ChatInput from './ChatInput';
import Messages from './Messages';

export default function Chat({ fileid }: { fileid: string }) {
  return (
    <div className="bg-white flex flex-col col-span-2 border-l border-zinc-200 ">
      <Messages />
      <ChatInput fileid={fileid} />
    </div>
  );
}
