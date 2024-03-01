'use client';

import { Clock, FileText, Loader2, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { File } from '@prisma/client';
import moment from 'moment';
import { trpc } from '@/app/_trpc/client';
import { cn } from '@/lib/utils';
export default function File({ file }: { file: File }) {
  const { id, name, createdAt } = file;

  const utils = trpc.useUtils();

  const {
    mutate: deleteFile,
    isPending,
    isSuccess,
  } = trpc.deleteFile.useMutation();

  if (isSuccess) utils.getUserFiles.invalidate();

  function toggleOutline() {
    document.getElementById(String(id))?.classList.toggle('ring-1');
  }

  return (
    <div
      id={String(id)}
      className={cn(
        'bg-card rounded-lg py-3 px-3 shadow group transition ring-primary/50 ring-inset',
        {
          'pointer-events-none': isPending,
        }
      )}
    >
      <Link
        onMouseEnter={toggleOutline}
        onMouseLeave={toggleOutline}
        href={`/dashboard/${id}`}
        className="border-b border-neutral-200 flex items-start gap-3 pb-2 group hover:text-zinc-600 transition"
      >
        <div className="bg-primary min-h-7 min-w-7 group-hover:bg-primary/80 transition flex items-center justify-center rounded-full">
          <FileText className="h-4 w-4 text-white " />
        </div>
        <p className="text-lg truncate">{name}</p>
      </Link>
      <div className="flex justify-between items-center my-2 px-3 -mb-1">
        <div className="text-sm text-zinc-500 flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <p>{moment(createdAt).fromNow()}</p>
        </div>
        <Button
          disabled={isPending || isSuccess}
          size="sm"
          variant="destructive"
          className="bg-red-100 hover:bg-red-200 w-20 h-8"
          onClick={() => deleteFile({ id })}
        >
          {isPending || isSuccess ? (
            <Loader2 className="size-4 animate-spin text-red-700" />
          ) : (
            <Trash className="h-4 w-4 text-red-700 " />
          )}
        </Button>
      </div>
    </div>
  );
}
