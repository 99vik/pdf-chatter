import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';
import { Button } from './ui/button';
import UserMenu from './UserMenu';
import DashboardLink from './DashboardLink';
import { kindeAuth } from '@/lib/kindeAuth';
import Image from 'next/image';

export default async function Navbar() {
  const user = await kindeAuth();

  return (
    <nav className="w-full flex items-center justify-between py-3 px-4 sm:px-20 bg-white border border-zinc-200 shadow-sm ">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          src="/logo.png"
          width={128}
          height={128}
          alt="Logo"
          className="h-[30px] w-[30px]"
        />
        <p className="text-primary text-xl sm:text-lg font-bold">PDF chatter</p>
      </Link>
      <div className="flex gap-6 items-center">
        {!user ? (
          <LoginLink>
            <Button size="sm">Sign in</Button>
          </LoginLink>
        ) : (
          <div className="flex justify-center items-center gap-6 sm:gap-10">
            <DashboardLink />
            <UserMenu
              name={user.given_name! + ' ' + user.family_name!}
              email={user.email!}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
