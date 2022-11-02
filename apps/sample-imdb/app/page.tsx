import { SearchResult } from './search-result'

const Home = async () => {
  return (
    <>
      {/** @ts-expect-error */}
      <SearchResult />
    </>
  )
}

export default Home
