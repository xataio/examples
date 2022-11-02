import { HeaderNav } from '~/components/header-nav'
import { Search } from '~/components/search'
import { MoviesList } from '~/components/movies-list'
import { getMovies, getTotalTitles } from '~/lib/db.server'
import { Suspense } from 'react'

export const SearchResult = async ({
  searchTerm = '',
}: {
  searchTerm?: string
}) => {
  //   const { searchTerm = '' } = searchParams
  const allMovies = getMovies(searchTerm)
  const aggregateTitles = getTotalTitles()

  const { titles = [] } = await allMovies
  const { totalTitles = '0' } = await aggregateTitles

  return (
    <main>
      <HeaderNav>
        <Search term={searchTerm} />
        <strong className="col-span-2 text-center">
          Search on: {totalTitles} titles
        </strong>
      </HeaderNav>
      {titles.length < 1 ? (
        <article className="grid place-items-center">
          <p>The Case of Missing Data</p>
        </article>
      ) : (
        <article>
          <Suspense fallback={<p>Loading movies ....</p>}>
            {/** @ts-expect-error */}
            <MoviesList titles={titles} />
          </Suspense>
        </article>
      )}
    </main>
  )
}
