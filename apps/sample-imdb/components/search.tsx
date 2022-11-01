'use client'
import { useState } from 'react'

export const Search = () => {
  const [term, setTerm] = useState<string | undefined>()

  return (
    <input
      type="search"
      value={term}
      onChange={(evt) => setTerm(evt.currentTarget.value)}
      className="h-[2em] w-[50ch] pl-4 border-2 border-neutral-600 rounded-2xl bg-transparent text-white outline-none focus:transform focus:scale-110 origin-left transition-all focus:border-pink-500"
    />
  )
}
