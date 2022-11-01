import { type ReactNode } from 'react'
import '~/styles/globals.css'
import { SearchProvider } from './search-provider'

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>XMDB</title>
        <meta name="description" content="Xata Movie Database" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  )
}

export default RootLayout
