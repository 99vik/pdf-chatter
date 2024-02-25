import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { RotateCw } from 'lucide-react';

export default function RotateControl({
  setCurrentRotation,
}: {
  setCurrentRotation: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setCurrentRotation((prev) => (prev + 90) % 360)}
    >
      <RotateCw className="text-zinc-700" strokeWidth={1.5} size={20} />
    </Button>
  );
}
