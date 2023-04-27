import { Suspense } from 'react'
import Loader from './loader'
import { getTotalTitles } from '~/lib/db.server'
import { SearchResult } from './search-result'
import { HeaderNav } from '~/components/header-nav'

const Home = async ({
  searchParams,
}: {
  searchParams: { searchField?: string }
}) => {
  const aggregateTitles = getTotalTitles()
  const { totalTitles = '0' } = await aggregateTitles

  return (
    <main>
      <HeaderNav
        searchTerm={searchParams.searchField}
        totalTitles={totalTitles}
      />
      <Suspense fallback={<Loader />}>
        {/**
         * there is no TypeScript support for
         * async Server Components in JSX
         *
         */}
        {/** @ts-expect-error */}
        <SearchResult searchTerm={searchParams.searchField} />
      </Suspense>
    </main>
  )
}

export default Home
