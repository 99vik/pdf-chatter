import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { Button } from './ui/button';
import UserMenu from './UserMenu';

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="w-full flex items-center justify-between py-3 px-4 sm:px-20 bg-white shadow">
      <Link href="/">
        <p className="text-primary text-xl sm:text-lg font-bold">PDF chatter</p>
      </Link>
      <div className="flex gap-6 items-center">
        {!user ? (
          <LoginLink>
            <Button size="sm">Sign in</Button>
          </LoginLink>
        ) : (
          <div className="flex justify-center items-center gap-6 sm:gap-10">
            <Link
              href="/dashboard"
              className="text-zinc-700 font-semibold group"
            >
              Dashboard
              <span className="block mx-auto w-0 group-hover:w-full duration-300 ease-out h-0.5 rounded-full bg-primary/90"></span>
            </Link>
            <UserMenu />
          </div>
        )}
      </div>
    </nav>
  );
}
