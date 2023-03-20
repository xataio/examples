import { ReactNode } from 'react'
import { Footer } from '~/components/footer'

export default function InLayout({ children }: { children: ReactNode }) {
  return (
    <article
      style={{
        minHeight: '100vh',
        padding: '5rem 1rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
      <Footer />
    </article>
  )
}
