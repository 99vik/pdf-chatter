'use client';

import { trpc } from '@/app/_trpc/client';
import { Button } from './ui/button';

function File({
  props,
}: {
  props: {
    id: number;
    name: string;
  };
}) {
  const { name } = props;
  console.log(name);
  return (
    <div className="bg-white rounded-lg p-2">
      <div className="border-b border-zinc-300">
        <p>{name}</p>
      </div>
      <div className="flex justify-between my-1">
        <p>1 day ago</p>
        <Button size="sm" variant="destructive">
          DEL
        </Button>
      </div>
      <Button className="w-full">Open</Button>
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
