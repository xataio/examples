import { Suspense } from 'react'
import { SearchResult } from '~/app/search-result'
import Loading from '~/app/loading'
import { getTotalTitles } from '~/lib/db.server'
import { HeaderNav } from '~/components/header-nav'

export default async function Movie({ params }: { params: { term: string } }) {
  const { term } = params
  const aggregateTitles = getTotalTitles()
  const { totalTitles = '0' } = await aggregateTitles

  return (
    <main>
      <HeaderNav searchTerm={term} totalTitles={totalTitles} />
      <Suspense fallback={<Loading />}>
        {/** @ts-expect-error */}
        <SearchResult searchTerm={term} />
      </Suspense>
    </main>
  )
}
