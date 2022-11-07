import { Suspense } from 'react'
import Loading from './loading'
import { getTotalTitles } from '~/lib/db.server'
import { SearchResult } from './search-result'
import { HeaderNav } from '~/components/header-nav'

const Home = async () => {
  const aggregateTitles = getTotalTitles()
  const { totalTitles = '0' } = await aggregateTitles

  return (
    <main>
      <HeaderNav totalTitles={totalTitles} />
      <Suspense fallback={<Loading />}>
        {/** @ts-expect-error */}
        <SearchResult />
      </Suspense>
    </main>
  )
}

export default Home
