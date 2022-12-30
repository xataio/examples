import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Logout } from '~/shared/logout'
import templateStyles from '~/styles/template.module.css'
import '~/styles/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${templateStyles.wrapper} ${inter.className}`}>
        <Component {...pageProps} />
        <footer>
          <a href="https://xata.io">by Xata</a>
        </footer>
      </div>
    </SessionProvider>
  )
}
