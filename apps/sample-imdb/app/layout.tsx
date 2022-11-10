import { type ReactNode } from 'react'
import '~/styles/globals.css'

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
