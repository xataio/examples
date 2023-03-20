import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '~/lib/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`wrapper  ${inter.className}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
