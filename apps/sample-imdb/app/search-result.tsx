import { MoviesList } from '~/components/movies-list'
import { getMovies } from '~/lib/db.server'

export const SearchResult = async ({
  searchTerm = '',
}: {
  searchTerm?: string
}) => {
  const { titles = [] } = await getMovies(searchTerm)

  return (
    <>
      {titles.length < 1 ? (
        <article className="grid place-items-center">
          <p>The Case of Missing Data</p>
        </article>
      ) : (
        <article>
          {/** @ts-expect-error Server Component */}
          <MoviesList titles={titles} />
        </article>
      )}
    </>
  )
}
