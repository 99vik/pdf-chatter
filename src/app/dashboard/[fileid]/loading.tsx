import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="grid grid-cols-5 h-[calc(100vh-61.6px)] ">
      <div className="col-span-3 flex flex-col">
        <h1 className="text-lg my-1 text-center text-zinc-600 font-semibold">
          Loading pdf..
        </h1>
        <div className="bg-white flex-1 mx-6 mb-3 animate-pulse rounded-lg border border-zinc-200 shadow-lg flex flex-col">
          <div className="border-b border-zinc-200 p-3 h-[48.8px]"></div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="bg-white col-span-2 border-l border-zinc-200 flex items-center justify-center">
        <Loader2 size={50} className="animate-spin text-primary" />
      </div>
    </div>
  );
}
