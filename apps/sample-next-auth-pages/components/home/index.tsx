import type { Session } from 'next-auth'
import Link from 'next/link'
import Image from 'next/image'
import xataColored from '~/public/xatafly-colored.svg'
import { Login } from '~/components/login'
import { Footer } from '~/components/footer'
import styles from './home.module.css'

export function Home({
  session,
  callbackUrl,
}: {
  session: Session | null
  callbackUrl: string
}) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image src={xataColored} alt="Xata logo" className={styles.logo} />
        <h1 className={styles.title}>Xata + Auth.js</h1>
      </header>
      <article className={styles.ctaWrap}>
        <pre className={styles.code}>
          {`npx degit \\
https://github.com/xataio/examples/apps/sample-next-auth-pages \\
<your_directory>`}
        </pre>
        {Boolean(session) ? (
          <Link href="/in" className={styles.card}>
            <h2>
              {session?.user?.name} <span>-&gt;</span>
            </h2>
            <p>Goes to profile page</p>
          </Link>
        ) : (
          <Login callbackUrl={callbackUrl} />
        )}
        <ul className={styles.linksGrid}>
          <li>
            <a href="https://xata.io" className={styles.card}>
              <h2>Xata Website</h2>
              <p>Create your data layer.</p>
            </a>
          </li>

          <li>
            <a href="https://xata.io/docs" className={styles.card}>
              <h2>Xata Docs</h2>
              <p>Check our documentation.</p>
            </a>
          </li>

          <li>
            <a href="https://xata.io/discord" className={styles.card}>
              <h2>Xata Community</h2>
              <p>Join to our Discord</p>
            </a>
          </li>
        </ul>
      </article>
      <Footer />
    </main>
  )
}
