'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLink() {
  const route = usePathname();

  return (
    <Link href="/dashboard" className="text-zinc-700 font-semibold group">
      Dashboard
      <span
        className={cn(
          'block mx-auto w-0 group-hover:w-full duration-300 ease-out h-0.5 rounded-full bg-primary/90',
          {
            'w-full': route === '/dashboard',
          }
        )}
      ></span>
    </Link>
  );
}
