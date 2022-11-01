import { type ReactNode } from 'react'
import '~/styles/globals.css'

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>XMDB</title>
        <meta name="description" content="Xata Movie Database" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <footer className="flex justify-center items-center gap-2 py-3">
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
