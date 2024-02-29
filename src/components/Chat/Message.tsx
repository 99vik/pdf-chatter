import { cn } from '@/lib/utils';
import { Message } from '@prisma/client';
import { Bot, CircleUserRound } from 'lucide-react';

export default function Message({ message }: { message: Message }) {
  return (
    <div
      className={cn('flex gap-1 items-end', {
        'self-end flex-row-reverse': message.userId,
      })}
    >
      {message.userId ? (
        <CircleUserRound className="text-primary translate-y-2" size={25} />
      ) : (
        <Bot className="text-zinc-600 translate-y-2" size={25} />
      )}
      <div
        style={{
          clipPath: message.userId
            ? 'polygon(0% 0%, 0% 100%, 100% 100%)'
            : 'polygon(100% 0%, 0% 100%, 100% 100%)',
        }}
        className={cn(
          'h-2 aspect-square',
          message.userId ? 'bg-primary -ml-1' : 'bg-zinc-200/70 -mr-1'
        )}
      />
      <p
        className={cn(
          'rounded-t-lg px-4 py-2 w-fit ',
          message.userId
            ? 'bg-primary text-white self-end rounded-bl-lg ml-3'
            : 'bg-zinc-200/70 rounded-br-lg mr-3'
        )}
      >
        {message.body}
      </p>
    </div>
  );
}
