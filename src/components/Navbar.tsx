import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full max-w-screen-2xl flex items-center justify-between bg-white py-4 px-2 shadow">
      <p className="text-primary text-lg font-bold">PDF chatter</p>
      <div>
        <Link href="/dashboard">Dashboard</Link>
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
        <LogoutLink>Log out</LogoutLink>
      </div>
    </nav>
  );
}
