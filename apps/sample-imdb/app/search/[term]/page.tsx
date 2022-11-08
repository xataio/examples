import { Suspense } from 'react'
import { SearchResult } from '~/app/search-result'
import Loading from '~/app/loading'
import { getTotalTitles } from '~/lib/db.server'
import { HeaderNav } from '~/components/header-nav'

export default async function Movie({ params }: { params: { term: string } }) {
  const { term } = params
  const { totalTitles = '0' } = await getTotalTitles()

  return (
    <main>
      <HeaderNav searchTerm={term} totalTitles={totalTitles} />
      <Suspense fallback={<Loading />}>
        {/**
         * there is no TypeScript support for
         * async Server Components in JSX
         *
         */}
        {/** @ts-expect-error */}
        <SearchResult searchTerm={term} />
      </Suspense>
    </main>
  )
}
