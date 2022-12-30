'use client'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export function Logout() {
  const [inFlight, setInFlight] = useState(false)

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        setInFlight(true)
        signOut({ callbackUrl: '/' })
      }}
    >
      <button type="submit" disabled={inFlight}>
        Logout
      </button>
    </form>
  )
}
