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
    <div>
      <p>{file.name}</p>
    </div>
  );
}
