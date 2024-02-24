import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function PdfToolbar({
  setPageNumber,
  pageNumber,
  numPages,
}: {
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageNumber: number;
  numPages: number | undefined;
}) {
  return (
    <div className="border-b border-zinc-200 h-12 flex items-center px-3">
      <div className="flex justify-center items-center">
        <Button
          disabled={pageNumber <= 1}
          variant="ghost"
          size="sm"
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          <ChevronLeft size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <Input
            className="w-9 h-8 p-0 text-center"
            defaultValue={pageNumber}
          />
          <p className="flex items-center gap-2">
            /{' '}
            {numPages ? (
              numPages
            ) : (
              <Loader2 size={14} className="animate-spin" />
            )}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
