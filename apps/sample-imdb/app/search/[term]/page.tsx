import { SearchResult } from '~/app/search-result'

export default async function Movie({ params }: { params: { term: string } }) {
  const { term } = params

  return (
    <>
      {/** @ts-expect-error */}
      <SearchResult searchTerm={term} />
    </>
  )
}
