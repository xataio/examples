import '~/shared/globals.css'
import { type ReactNode } from 'react'
import { Inter } from '@next/font/google'
import { unstable_getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Logout } from '~/shared/components/logout'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await unstable_getServerSession(authConfig)

  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>
          {Boolean(session) && (
            <aside>
              <Logout />
            </aside>
          )}
          {children}
        </main>
      </body>
    </html>
  )
}
