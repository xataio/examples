import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { Logout } from '~/shared/logout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {Boolean(pageProps.session) && (
        <aside>
          <Logout />
        </aside>
      )}
      <Component {...pageProps} />
      <footer>
        <a href="https://xata.io">by Xata</a>
      </footer>
    </SessionProvider>
  )
}
