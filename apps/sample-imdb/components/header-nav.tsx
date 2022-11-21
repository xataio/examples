import { type FC } from 'react'
import { Xmdb } from './logo'
import { Search } from './search'

export const HeaderNav: FC<{ searchTerm?: string; totalTitles?: string }> = ({
  searchTerm,
  totalTitles,
}) => (
  <>
    <aside className="py-2 text-center bg-neutral-900 text-lg">
      <span>Read more about it </span>{' '}
      <a
        href="https://xata.io"
        rel="noreferrer"
        target="_blank"
        className="text-pink-400 hover:text-pink-300 inline-block underline transition-transform hover:transform hover:rotate-3 hover:scale-110 px-2"
      >
        Over 9 Million Rows
      </a>{' '}
      <span>blog post.</span>
    </aside>
    <header className="grid grid-cols-[auto,1fr] gap-2 mx-auto max-w-prose pt-16 pb-12">
      <h1 className="self-center">
        <Xmdb />
      </h1>
      <Search term={searchTerm} />
      {totalTitles ? (
        <strong className="col-span-2 text-center">
          Search on: {totalTitles} titles
        </strong>
      ) : null}
    </header>
  </>
)
