import { type ReactNode } from 'react'
import '~/styles/globals.css'

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>XMDB: Xata Movie Database</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Xata Movie Database" />

        <meta property="description" content={`Xata Movie Database`} />
        {/* <meta
          property="og:image"
          content={`${process.env.VERCEL_URL}/api/og?title=${primaryTitle}&image=${coverUrl}`}
        /> */}
        <meta property="og:title" content="XMDB: Xata Movie Database" />
        <meta property="og:description" content="Xata Movie Database" />
        <meta property="og:type" content="website" />

        {/* <meta
          property="twitter:image"
          content={`${process.env.VERCEL_URL}/api/og?title=${primaryTitle}&image=${coverUrl}`}
        /> */}
        <meta property="twitter:title" content="XMDB: Xata Movie Database" />
        <meta property="twitter:description" content="Xata Movie Database" />
        <meta property="twitter:card" content="summary_large_image" />
      </head>
      <body className="grid grid-rows-[1fr,auto] min-h-screen">
        {children}
        <footer className="flex justify-center items-center gap-2 py-12">
          <span>Powered by</span>

          <a
            className="inline-block"
            href="https://xata.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            <object
              data="/xatafly.svg"
              aria-label="Xata Logo"
              className="w-8"
            />
          </a>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
