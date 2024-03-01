'use client';

import { Button } from '@/components/ui/button';

export default function RequestButton({
  uploadLimit,
}: {
  uploadLimit: 'PENDING' | 'NORMAL';
}) {
  function requestUpgrade() {
    console.log('request');
  }

  return (
    <div className="mt-6 flex items-center justify-center">
      {uploadLimit === 'NORMAL' ? (
        <Button onClick={requestUpgrade} size="lg">
          Request upgraded plan
        </Button>
      ) : (
        <Button disabled size="lg">
          Upgraded plan request sent
        </Button>
      )}
    </div>
  );
}
