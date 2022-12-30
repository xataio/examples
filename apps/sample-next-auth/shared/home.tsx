import type { Session } from 'next-auth'
import Link from 'next/link'
import Image from 'next/image'
import xataLogo from '~/public/xatafly-colored.svg'
import styles from '~/styles/page.module.css'
import { Login } from '~/shared/login'

export function Home({ session }: { session: Session | null }) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image src={xataLogo} alt="Xata logo" className={styles.logo} />
        <h1 className={styles.title}>Xata + Next-Auth</h1>

        <pre className={styles.code}>
          {`npx degit \\
https://github.com/xataio/examples/apps/sample-next-auth \\
<your_directory>`}
        </pre>
      </header>
      {Boolean(session) ? (
        <Link href="/in" className={styles.card}>
          <h2>
            {session?.user?.name} <span>-&gt;</span>
          </h2>
          <p>Goes to profile page</p>
        </Link>
      ) : (
        <Login />
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
    </main>
  )
}
