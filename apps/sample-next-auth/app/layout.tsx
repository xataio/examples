import '~/styles/globals.css'
import { type ReactNode } from 'react'
import { Inter } from '@next/font/google'
import { unstable_getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Logout } from '~/shared/logout'
import Image from 'next/image'
import xataWhite from '~/public/xatafly-white.svg'

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
          <a href="https://xata.io">
            by <Image src={xataWhite} alt="Xata white logo" />
          </a>
        </footer>
      </body>
    </html>
  )
}
