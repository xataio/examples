import type { Metadata } from 'next'
import { type ReactNode } from 'react'
import Image from 'next/image'
import xatafly from '~/public/xatafly.svg'
import xataflyWhite from '~/public/xatafly-white.svg'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import '~/styles/globals.css'

const defaults = {
  title: 'XMDB: Xata Movie Database',
  description:
    'Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over 9 million records).',
  image: `${process.env.VERCEL_URL}/xmdb-og.png`,
}

export const metadata: Metadata = {
  ...defaults,
  themeColor: 'black',
  keywords: ['Xata', 'Database', 'Serverless', 'Next.js', 'React'],
  colorScheme: 'dark',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    ...defaults,
    url: '',
    locale: 'en-US',
    type: 'website',
    siteName: 'Xata Movie Database',
  },
  twitter: {
    card: 'summary_large_image',
    siteId: '1467726470533754880',
    creator: '@xata',
    images: [defaults.description],
    title: defaults.title,
    description: defaults.description,
  },
}

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto,1fr,auto] min-h-screen">
        <aside className="sticky top-0 opacity-40 hover:opacity-100 focus-within:opacity-100">
          <ul className="flex justify-end gap-3 pt-8 pr-8">
            <li>
              <a href="https://xata.io" rel="noopener noreferrer">
                <Image
                  src={xataflyWhite}
                  alt="Xata logo"
                  className="w-6 hover:scale-125 focus:scale-125 transition-transform"
                />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/xataio/examples/tree/main/apps/sample-imdb"
                rel="noopener noreferrer"
              >
                <Github className="text-2xl focus:scale-125 hover:scale-125 transition-transform" />
              </a>
            </li>
            <li>
              <a href="https://xata.io/discord" rel="noopener noreferrer">
                <Discord className="text-2xl focus:scale-125 hover:scale-125 transition-transform" />
              </a>
            </li>
          </ul>
        </aside>
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
    </html>
  )
}

export default RootLayout
