import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Get started with Xata and Next.js'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center p-8 lg:p-24 min-h-screen">
          <div className="z-10 h-50 w-full max-w-5xl items-center justify-between text-xl lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto bg-gradient-to-b from-white via-white via-65% dark:from-black dark:via-black lg:bg-none">
              <a href="/">Get started with Xata and Next.js</a>
            </p>
            <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a href="https://xata.io" className="w-20">
                <img src="https://raw.githubusercontent.com/xataio/examples/main/docs/app_logo.svg" />
              </a>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
