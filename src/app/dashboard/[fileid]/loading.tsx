import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-[calc(100vh-61.6px)] sm:h-[calc(100vh-61.6px)]">
      <div className="col-span-3 flex flex-col mb-16 md:mb-0">
        <h1 className="text-lg my-1 h-[28px]"></h1>
        <div className="bg-white flex-1 mx-6 mb-3 rounded-lg border border-zinc-200 shadow-lg flex flex-col">
          <div className="border-b border-zinc-200 p-3 h-[48.8px]"></div>
          <div className="flex-1">
            <div className="bg-white flex justify-center items-center h-96">
              <Loader2 size={40} className="text-primary animate-spin" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex-col col-span-2 border-l border-zinc-200 flex">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={50} className="animate-spin text-primary" />
        </div>
        <div className="border-t p-2 w-full sm:p-3 bg-neutral-50 h-[76.8px]" />
      </div>
    </div>
  );
}
