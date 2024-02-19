'use client';

import { trpc } from '@/app/_trpc/client';
import { Button } from './ui/button';
import { Clock, FileText, Trash } from 'lucide-react';
import Link from 'next/link';

function File({
  props,
}: {
  props: {
    id: number;
    name: string;
  };
}) {
  const { id, name } = props;
  return (
    <div className="bg-card rounded-lg py-3 px-3 shadow group transition">
      <Link
        href={`/dashboard/${id}`}
        className="border-b border-neutral-200 flex items-start gap-3 pb-2 hover:text-zinc-500 transition"
      >
        <div className="bg-primary h-7 w-7 flex items-center justify-center rounded-full">
          <FileText className="h-4 w-4 text-white" />
        </div>
        <p className="text-lg">{name}</p>
      </Link>
      <div className="flex justify-between items-center my-2 px-3 -mb-1">
        <p className="text-sm text-zinc-500 flex items-center gap-1">
          <Clock className="h-3 w-3" />1 day ago
        </p>
        <Button
          size="sm"
          variant="destructive"
          className="bg-red-100 hover:bg-red-200 w-20 h-8"
        >
          <Trash className="h-4 w-4 text-red-700 " />
        </Button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: files, isLoading, isError } = trpc.getUserFiles.useQuery();
  console.log(files);

  return (
    <main className="sm:px-40">
      <div className="flex items-center justify-between mt-16 pb-4 border-b border-zinc-200">
        <h1 className="font-semibold text-4xl text-zinc-700">Your files</h1>
        <Button size="sm">Upload file</Button>
      </div>
      {isLoading ? (
        <p>loading</p>
      ) : files && files.length !== 0 ? (
        <div className="grid grid-cols-3 gap-6 mt-4">
          {files.map((file) => (
            <File key={file.id} props={file} />
          ))}
        </div>
      ) : (
        <p>empty</p>
      )}
    </main>
  );
}
