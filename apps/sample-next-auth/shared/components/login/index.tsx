'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import styles from './login.module.css'

export function Login({ callbackUrl }: { callbackUrl: string }) {
  const [inFlight, setInFlight] = useState(false)

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        setInFlight(true)
        signIn('github', { callbackUrl })
      }}
    >
      <button className={styles.cta} type="submit" disabled={inFlight}>
        Login <span>-&gt;</span>
      </button>
    </form>
  )
}
