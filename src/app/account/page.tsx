import { Button } from '@/components/ui/button';
import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { CircleUser } from 'lucide-react';
import { redirect } from 'next/navigation';
import RequestButton from './RequestButton';

export default async function Page() {
  const user = await kindeAuth();

  if (!user) redirect('/api/auth/login');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect('/auth-callback');
  return (
    <main className="max-w-screen-2xl flex flex-col px-4 sm:px-20 md:px-24 lg:px-40">
      <div className="flex gap-3 items-center justify-start mt-16 pb-4 border-b border-zinc-200">
        <CircleUser size={70} strokeWidth={1.25} className="text-zinc-700" />
        <h1 className="font-semibold text-4xl text-zinc-700">
          {user.given_name} {user.family_name}
        </h1>
      </div>
      <div className="mt-6 text-zinc-700 text-lg">
        <p>
          <span className="font-semibold mr-2">Email:</span> {user.email}
        </p>
        <p className="mt-2">
          <span className="font-semibold mr-2">Your plan:</span>{' '}
          {dbUser.uploadLimit !== 'VIP' ? 'Normal ' : 'Upgraded '}
          <span className="text-sm text-zinc-500 ml-4">
            {dbUser.uploadLimit !== 'VIP'
              ? ' (With a normal plan you can upload up to 4 files, max 2MB each)'
              : ' (With a upgraded plan you can upload up to 8 files, max 8MB each)'}
          </span>
        </p>
        {dbUser.uploadLimit !== 'VIP' && (
          <RequestButton uploadLimit={dbUser.uploadLimit} />
        )}
      </div>
    </main>
  );
}
