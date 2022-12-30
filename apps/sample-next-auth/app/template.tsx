import type { ReactNode } from 'react'
import styles from '~/styles/template.module.css'

export default function RootTemplate({ children }: { children: ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>
}
