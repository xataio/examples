import { MoviesList } from '~/components/movies-list'
import { getMovies } from '~/lib/db.server'
import { Suspense } from 'react'
import Loading from './loading'

export const SearchResult = async ({
  searchTerm = '',
}: {
  searchTerm?: string
}) => {
  const allMovies = getMovies(searchTerm)
  const { titles = [] } = await allMovies

  return (
    <>
      {titles.length < 1 ? (
        <article className="grid place-items-center">
          <p>The Case of Missing Data</p>
        </article>
      ) : (
        <article>
          <Suspense fallback={<Loading />}>
            {/**
             * there is no TypeScript support for
             * async Server Components in JSX
             *
             */}
            {/** @ts-expect-error */}
            <MoviesList titles={titles} />
          </Suspense>
        </article>
      )}
    </>
  )
}
