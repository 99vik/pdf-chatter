import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="text-zinc-700/90 h-9 w-9 p-1.5 border bg-zinc-100 border-zinc-600/50 transition cursor-pointer hover:bg-zinc-200 rounded-full" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p>User name</p>
          <p className="text-zinc-600 text-xs font-normal">
            examplemail@mail.com
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-zinc-200" />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/account" className="flex gap-2">
            <User strokeWidth={1.25} className="h-5 w-5" />
            Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer ">
          <LogoutLink className="flex gap-2">
            <LogOut strokeWidth={1.25} className="h-5 w-5" />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
