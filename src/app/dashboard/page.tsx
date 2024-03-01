import Dashboard from '@/components/Dashboard';
import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const user = await kindeAuth();

  if (!user || !user.email) redirect('/api/auth/login');

  let dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser)
    try {
      dbUser = await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.log('ERROR');
      redirect('/');
    }

  return <Dashboard userUploadLimit={dbUser.uploadLimit} />;
}
