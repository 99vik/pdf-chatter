import { Dispatch, SetStateAction } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '../ui/button';

export default function ZoomControl({
  setCurrentScale,
  currentScale,
}: {
  setCurrentScale: Dispatch<SetStateAction<number>>;
  currentScale: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Search size={14} />
          <p className="mx-1">{currentScale * 100}%</p>
          <ChevronDown size={12} className="text-zinc-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Zoom</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={currentScale === 1}
          onSelect={() => setCurrentScale(1)}
        >
          100%
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={currentScale === 1.5}
          onSelect={() => setCurrentScale(1.5)}
        >
          150%
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={currentScale === 2}
          onSelect={() => setCurrentScale(2)}
        >
          200%
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
