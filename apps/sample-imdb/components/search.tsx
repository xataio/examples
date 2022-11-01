'use client'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { useSearch } from '~/app/search-provider'

export const Search = () => {
  /**
   * @TODO finish search logic
   */
  const [term, setTerm] = useState<string | undefined>()
  // const router = useRouter()

  // useEffect(() => {
  //   if (typeof term === 'string' && term.length > 3) router.replace(`/${term}`)
  // }, [term])

  return (
    <input
      type="search"
      value={term}
      onChange={(evt) => setTerm(evt.currentTarget.value)}
      className="h-[2em] w-[50ch] pl-4 border-2 border-neutral-600 rounded-2xl bg-transparent text-white outline-none focus:transform focus:scale-110 origin-left transition-all focus:border-pink-500"
    />
  )
}
