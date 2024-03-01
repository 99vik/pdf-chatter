import { LayoutDashboard, LogOut, Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu size={36} className="text-primary block sm:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen translate-y-2 shadow-xl">
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex gap-2 py-3 items-center justify-center font-semibold text-xl"
          >
            <LayoutDashboard strokeWidth={1.5} className="h-5 w-5" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/account"
            className="flex gap-2 py-3 items-center justify-center font-semibold text-xl"
          >
            <User strokeWidth={1.5} className="h-5 w-5" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogoutLink className="flex gap-2 py-3 items-center justify-center font-semibold text-xl">
            <LogOut strokeWidth={1.5} className="h-5 w-5" />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
