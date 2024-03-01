'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default function RequestButton({
  uploadLimit,
}: {
  uploadLimit: 'PENDING' | 'NORMAL';
}) {
  const {
    mutate: requestUpgrade,
    isPending,
    isSuccess,
  } = trpc.requestPlanUpgrade.useMutation();

  return (
    <div className="mt-6 flex items-center justify-center">
      {uploadLimit === 'NORMAL' && !isSuccess ? (
        <Button disabled={isPending} onClick={() => requestUpgrade()} size="lg">
          {isPending ? (
            <Loader2 className="text-white animate-spin" size={20} />
          ) : (
            'Request upgraded plan'
          )}
        </Button>
      ) : (
        <Button disabled size="lg">
          Upgraded plan request sent
        </Button>
      )}
    </div>
  );
}
