import { HeaderNav } from '~/components/header-nav'
import { Search } from '~/components/search'
import { MoviesList } from '~/components/movies-list'
import { getMovies, getTotalTitles } from '~/lib/db.server'

const Home = async ({ params }: { params: { term: string } }) => {
  const { term = undefined } = params
  const { titles = [] } = await getMovies(term)
  const { totalTitles = '0' } = await getTotalTitles()

  return (
    <main className="grid grid-rows-[auto,1fr,auto] h-screen">
      <HeaderNav>
        <Search />
        <strong className="col-span-2 text-center">
          Search on: {totalTitles} titles.
        </strong>
      </HeaderNav>
      <article>
        {titles.length < 1 ? (
          <div>The Case of Missing Data</div>
        ) : (
          <MoviesList titles={titles} />
        )}
      </article>
    </main>
  )
}

export default Home
