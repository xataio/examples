import { type Metadata } from 'next'
import { type ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import Image from 'next/image'
import xatafly from '~/public/xatafly.svg'
import '~/styles/globals.css'
import { TopHeader } from '~/components/top-header'
import { dark } from '@clerk/themes'

const image = `${process.env.VERCEL_URL}/xmdb-og.png`
const title = 'XMDB: Xata Movie Database'
const description =
  'Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over 9 million records).'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: title,
  description: description,
  openGraph: {
    images: [image],
    title: title,
    description: description,
    type: 'website',
  },
  twitter: {
    images: [image],
    title: title,
    description: description,
    card: 'summary_large_image',
  },
}

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body className="grid grid-rows-[auto,1fr,auto] min-h-screen">
          {/* @ts-expect-error Server Component */}
          <TopHeader />
          {children}
          <footer className="flex justify-center items-center gap-2 py-12">
            <span>Powered by</span>

            <a
              className="inline-block"
              href="https://xata.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                src={xatafly}
                alt="Xata Logo"
                className="w-8 transition-transform hover:-translate-y-2 hover:rotate-12 hover:translate-x-2"
              />
            </a>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  )
}

export default RootLayout
