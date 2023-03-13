import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import templateStyles from '~/shared/template.module.css'
import '~/shared/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${templateStyles.wrapper} ${inter.className}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
