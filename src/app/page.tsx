import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
              'polygon(55% 0, 100% 26%, 72% 55%, 100% 100%, 0 100%, 21% 33%)',
          }}
          className="h-[400px] md:h-[500px] lg:h-[600px] opacity-25 aspect-square absolute -translate-y-[40%] right-[1%] bg-gradient-to-b from-primary from-55% to-green-400"
        ></div>
      </div>
      <div className="my-10 rounded-xl bg-zinc-500/20 p-3 max-w-[98%] sm:max-w-[85%] lg:max-w-[70%]">
        <Image
          src="/FinishedApp.png"
          width={1920}
          height={879}
          alt="Finished application"
          className="rounded-md"
        />
      </div>
      <div className="w-full lg:w-[70%] max-w-screen-2xl mb-10 px-2 md:px-0">
        <h2 className="text-xl sm:text-3xl font-bold text-left text-zinc-800 px-1 sm:px-6 mt-2">
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
    </div>
  );
}
