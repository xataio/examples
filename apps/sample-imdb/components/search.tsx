'use client'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent } from 'react'

export const Search = ({ term }: { term: string }) => {
  const router = useRouter()

  return (
    <form
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const value = new FormData(evt.currentTarget).get(
          'searchField'
        ) as string

        if (value.length) {
          router.push(`/?searchTerm=${value}`)
        }
      }}
    >
      <input
        type="search"
        name="searchField"
        defaultValue={term}
        onChange={debounce((evt: ChangeEvent<HTMLInputElement>) => {
          if (evt.target.value) {
            router.push(`/?searchTerm=${evt.target.value}`)
          }
        }, 300)}
        className="h-[2em] w-[50ch] pl-4 border-2 border-neutral-600 rounded-2xl bg-transparent text-white outline-none focus:transform focus:scale-110 origin-left transition-all focus:border-pink-500"
      />
    </form>
  )
}
