'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function Login() {
  const [inFlight, setInFlight] = useState(false)

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        setInFlight(true)
        signIn('github', { callbackUrl: '/in' })
      }}
    >
      <button type="submit" disabled={inFlight}>
        Login <span>-&gt;</span>
      </button>
    </form>
  )
}
