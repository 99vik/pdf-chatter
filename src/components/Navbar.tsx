import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { Button } from './ui/button';
import { CircleUserRound, User } from 'lucide-react';

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="w-full max-w-screen-2xl flex items-center justify-between bg-white py-2 px-4 shadow">
      <Link href="/">
        <p className="text-primary text-lg font-bold">PDF chatter</p>
      </Link>
      <div className="flex gap-6 items-center">
        {!user ? (
          <LoginLink>
            <Button size="sm">Sign in</Button>
          </LoginLink>
        ) : (
          <div className="flex justify-center items-center gap-10">
            <Link
              href="/dashboard"
              className="text-zinc-700 font-semibold group"
            >
              Dashboard
              <span className="block mx-auto w-0 group-hover:w-full duration-300 ease-out h-0.5 bg-primary/90"></span>
            </Link>
            <User className="text-zinc-700 h-9 w-9 p-1.5 border bg-zinc-100 border-zinc-600 rounded-full" />
          </div>
        )}
      </div>
    </nav>
  );
}
