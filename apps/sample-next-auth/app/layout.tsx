import '~/styles/globals.css'
import { type ReactNode } from 'react'
import { Inter } from '@next/font/google'
import { unstable_getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Logout } from '~/shared/logout'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await unstable_getServerSession(authConfig)

  return (
    <html lang="en" className={inter.className}>
      <body>
        {Boolean(session) && (
          <aside>
            <Logout />
          </aside>
        )}
        {children}
        <footer>
          <a href="https://xata.io">by Xata</a>
        </footer>
      </body>
    </html>
  )
}
