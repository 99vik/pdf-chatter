'use client';

import { trpc } from '@/app/_trpc/client';
import File from './File';
import FileSKeleton from '@/app/dashboard/FileSkeleton';
import { Ghost } from 'lucide-react';
import UploadButton from './UploadButton';

export default function Dashboard({
  userUploadLimit,
}: {
  userUploadLimit: 'NORMAL' | 'PENDING' | 'VIP';
}) {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  return (
    <main className="px-4 sm:px-20 md:px-24 lg:px-40">
      <div className="flex items-center justify-between mt-16 pb-4 border-b border-zinc-200">
        <h1 className="font-semibold text-4xl text-zinc-700">Your files</h1>

        <UploadButton userUploadLimit={userUploadLimit} />
      </div>
      <p className=" text-xs w-fit mt-1 ml-auto text-zinc-400 py-1 px-3 rounded-lg">
        {isLoading ? '-' : files?.length} /{' '}
        {userUploadLimit === 'VIP' ? '8' : '4'} Files uploaded
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-1">
        {isLoading ? (
          <FileSKeleton />
        ) : files && files.length !== 0 ? (
          <>
            {files.map((file) => (
              <File
                key={file.id}
                file={{ ...file, createdAt: new Date(file.createdAt) }}
              />
            ))}
          </>
        ) : (
          <div className="col-span-3 flex flex-col justify-center items-center mt-16 gap-3">
            <Ghost className="size-10 text-zinc-500" />
            <p className="text-zinc-500 font-semibold ">
              You have no uploaded PDF&apos;s.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
