import Dashboard from '@/components/Dashboard';
import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await kindeAuth();

  if (!user) redirect('/api/auth/login');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect('/auth-callback');

  return <Dashboard userUploadLimit={dbUser.uploadLimit} />;
}
