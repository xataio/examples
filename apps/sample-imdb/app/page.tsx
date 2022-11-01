import { HeaderNav } from '~/components/header-nav'
import { Search } from '~/components/search'
import { MoviesList } from '~/components/movies-list'
import { getMovies, getTotalTitles } from '~/lib/db.server'

const Home = async ({
  searchParams,
}: {
  searchParams: Record<'searchTerm', string>
}) => {
  const { titles = [] } = await getMovies()
  const { totalTitles = '0' } = await getTotalTitles()
  const { searchTerm } = searchParams

  return (
    <main className="grid grid-rows-[auto,1fr,auto] h-screen">
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
          {/** @ts-expect-error */}
          <MoviesList titles={titles} term={searchTerm} />
        </article>
      )}
      <footer className="flex justify-center items-center gap-2 py-3">
        <span>Powered by</span>

        <a
          className="inline-block"
          href="https://xata.io"
          rel="noopener noreferrer"
          target="_blank"
        >
          <object data="/xatafly.svg" aria-label="Xata Logo" className="w-8" />
        </a>
      </footer>
    </main>
  )
}

export default Home
