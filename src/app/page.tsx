import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="flex flex-col text-center items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 max-w-xl mt-14 mb-6">
        Interact with your{' '}
        <span className="text-primary whitespace-nowrap">PDF documents</span>{' '}
        instantly.
      </h1>
      <p className="text-zinc-700 text-lg max-w-2xl px-2">
        PDF Chatter empowers you to engage with your documents like never
        before. Simply upload your PDF and delve into dynamic conversations with
        AI.
      </p>
      <Link
        href="/api/auth/login"
        className={buttonVariants({
          className: 'px-7 mt-6 w-fit',
        })}
      >
        Get started
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      <div className="relative blur-3xl w-full max-w-screen-2xl overflow-x-clip -z-50 bg-red-500">
        <div
          style={{
            clipPath:
              'polygon(59% 59%, 34% 0, 99% 20%, 96% 80%, 47% 100%, 0 91%)',
          }}
          className="h-[400px] md:h-[500px] lg:h-[600px] opacity-30 aspect-square absolute -translate-y-[30%] right-[4%] bg-gradient-to-b from-primary from-55% to-green-400"
        ></div>
      </div>
      <div className="w-full max-w-screen-2xl">
        <h2 className="text-xl sm:text-3xl font-bold text-left text-zinc-800 px-1 sm:px-6 mt-16">
          Start chatting with your file in minutes.
        </h2>
        <ul className="w-full text-left px-1 sm:px-6 ">
          <li className="my-4">
            <p className="text-primary font-bold -mb-1">Step 1</p>
            <p className="text-lg font-semibold">Sign up for an account</p>
          </li>
          <li className="my-4">
            <p className="text-primary font-bold -mb-1">Step 2</p>
            <p className="text-lg font-semibold">Upload your PDF</p>
          </li>
          <li className="my-4">
            <p className="text-primary font-bold -mb-1">Step 3</p>
            <p className="text-lg font-semibold">Start asking questions</p>
          </li>
        </ul>
      </div>
      <div className="my-10">
        <p>finished app pic here</p>
      </div>
    </div>
  );
}
