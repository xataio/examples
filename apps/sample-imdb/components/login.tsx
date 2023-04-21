'use client'
import { useClerk } from '@clerk/nextjs/app-beta/client'

export function Login() {
  const { openSignIn } = useClerk()

  return (
    <button
      type="button"
      onClick={() => openSignIn()}
      className="py-1 px-2 rounded-md border-2  border-neutral-500 text-neutral-400 hover:bg-pink-500 hover:text-black focus:text-black focus:bg-pink-500 font-bold focus:border-pink-500 hover:border-pink-500"
    >
      Login
    </button>
  )
}
