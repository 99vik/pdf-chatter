import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col mt-20 items-center">
      <XCircle size={80} strokeWidth={1} className="text-red-600 mb-12" />
      <h2 className="text-3xl text-zinc-700 flex items-center gap-2">
        Ooops! Page not found!
      </h2>
      <p className="my-5 text-lg text-zinc-600">
        We can&apos;t seem to find a file you are looking for.
      </p>
      <Link href="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
