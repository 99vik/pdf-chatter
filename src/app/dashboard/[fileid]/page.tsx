import Chat from '@/components/Chat';
import FailedFileChat from '@/components/Chat/FailedFileChat';
import PdfRender from '@/components/PdfRender';
import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'File',
};

export default async function Page({
  params,
}: {
  params: {
    fileid: string;
  };
}) {
  const { fileid } = params;

  const user = await kindeAuth();

  if (!user) redirect('/api/auth/login');

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <main className="grid grid-cols-1 md:grid-cols-5 max-h-[calc(100vh-61.6px)] sm:h-[calc(100vh-61.6px)]">
      <PdfRender url={file.url} title={file.name} />
      {file.uploadStatus === 'SUCCESS' ? (
        <Chat fileid={file.id} />
      ) : (
        <FailedFileChat />
      )}
    </main>
  );
}
