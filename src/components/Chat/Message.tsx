import { cn } from '@/lib/utils';
import { Message } from '@prisma/client';
import { CircleUserRound } from 'lucide-react';

export default function Message({ message }: { message: Message }) {
  return (
    <div
      className={cn('flex gap-1 items-end', {
        'self-end flex-row-reverse': message.userId,
      })}
    >
      {message.userId ? (
        <CircleUserRound className="text-primary" size={25} />
      ) : (
        <CircleUserRound className="text-zinc-600" size={25} />
      )}
      <p
        className={cn(
          'rounded-lg px-4 py-2 w-fit ',
          message.userId ? 'bg-primary text-white self-end' : 'bg-zinc-100'
        )}
      >
        {message.body}
      </p>
    </div>
  );
}
