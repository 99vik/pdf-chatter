import { Loader2 } from 'lucide-react';
import { trpc } from '../_trpc/client';

export default function Page() {
  return (
    <div className="mt-20 flex-col flex items-center gap-4 text-center">
      <Loader2 className="h-28 w-28 text-primary/80 animate-spin" />
      <p className="text-zinc-800 text-4xl font-semibold mt-8">
        Setting up your account...
      </p>
      <p className="text-zinc-500 ">
        You will be redirected automatically, please wait.
      </p>
    </div>
  );
}
