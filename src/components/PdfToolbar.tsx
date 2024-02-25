import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

export default function PdfToolbar({
  setPageNumber,
  pageNumber,
  numPages,
}: {
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageNumber: number;
  numPages: number | undefined;
}) {
  const pageSchema = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });
  type TPageValidator = z.infer<typeof pageSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TPageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(pageSchema),
  });

  const handleInput = ({ page }: TPageValidator) => {
    setPageNumber(Number(page));
    setValue('page', String(page));
  };

  return (
    <div className="border-b border-zinc-200 h-12 flex items-center px-3">
      <div className="flex justify-center items-center gap-2">
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
            {...register('page')}
            className={cn('w-9 h-8 p-0 text-center', {
              'focus-visible:ring-red-500': errors.page,
            })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(handleInput)();
              }
            }}
          />
          <p className="flex items-center gap-2">
            /{' '}
            {numPages ? (
              numPages
            ) : (
              <Loader2
                size={14}
                className="animate-spin mt-1"
                strokeWidth={1.5}
              />
            )}
          </p>
        </div>
        <Button
          disabled={pageNumber >= (numPages ? numPages : 0)}
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
