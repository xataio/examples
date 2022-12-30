import type { Session } from 'next-auth'
import Image from 'next/image'
import styles from './profile.module.css'

type ProfileProps = {
  user: Session['user']
}

export const Profile = ({ user }: ProfileProps) => {
  return (
    <>
      <h1 className={styles.greeting}>
        Hello, <span>{user?.name ?? user?.email}</span>!
      </h1>
      <Image
        className={styles.avatar}
        src={user?.image ?? '/xatafly-colored.svg'}
        alt={`photo of ${user?.name}`}
        width="460"
        height="460"
        priority
      />
    </>
  )
}
