import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import Provider from './_trpc/Provider';
import { Toaster } from '@/components/ui/toaster';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'simplebar-react/dist/simplebar.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | PDF chatter',
    default: 'PDF chatter',
  },
  description: 'Chat with your PDF document.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DEFAULT_URL}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen overflow-y-scroll bg-neutral-100 font-sans body-bg antialiased scrollbar-narrow scrollbar-thin scrollbar-primary',
          inter.className
        )}
      >
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
