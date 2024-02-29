import Chat from '@/components/Chat';
import PdfRender from '@/components/PdfRender';
import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

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
      <Chat fileid={file.id} />
    </main>
  );
}
