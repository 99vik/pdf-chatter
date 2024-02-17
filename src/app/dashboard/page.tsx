import Dashboard from '@/components/Dashboard';
import { db } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect('/api/auth/login');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect('/auth-callback');

  return (
    <>
      <Dashboard />
      <p>{JSON.stringify(user)}</p>
    </>
  );
}
