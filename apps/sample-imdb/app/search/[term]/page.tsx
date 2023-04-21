import { Suspense } from 'react'
import { SearchResult } from '~/app/search-result'
import Loading from '~/app/loader'
import { getTotalTitles } from '~/lib/db.server'
import { HeaderNav } from '~/components/header-nav'

export default async function Movie({ params }: { params: { term: string } }) {
  const { term } = params
  const { totalTitles = '0' } = await getTotalTitles()

  return (
    <main>
      <HeaderNav searchTerm={term} totalTitles={totalTitles} />
      <Suspense fallback={<Loading />}>
        {/** @ts-expect-error  Server Component */}
        <SearchResult searchTerm={decodeURI(term)} />
      </Suspense>
    </main>
  )
}
