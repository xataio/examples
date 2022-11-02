import { fetchDefaultTitles, getMovie } from '~/lib/db.server'
import { TitlesRecord } from '~/lib/xata.codegen.server'

export default async function Movie({ params }: { params: { id: string } }) {
  const { id } = params
  const {
    coverUrl = '',
    primaryTitle,
    summary,
    startYear,
    genres = [],
    runtimeMinutes,
    averageRating,
    numVotes,
  } = (await getMovie(id)) as TitlesRecord

  return (
    <>
      <div className=" place-items-center grid">
        <h1>{primaryTitle}</h1>
        {typeof startYear === 'string' && (
          <time dateTime={startYear}>{startYear}</time>
        )}
        <p>{summary}</p>
        <aside>
          <p>Duration: {runtimeMinutes} minutes.</p>
        </aside>
        {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') && (
          <picture>
            <source srcSet={coverUrl} type="image/webp" />
            <img
              src={coverUrl}
              alt={`Poster for "${primaryTitle}"`}
              className="rounded-lg w-[200px] "
            />
          </picture>
        )}
        {genres &&
          genres.length > 0 &&
          genres?.map((genre) => <li key={id + genre}>{genre}</li>)}
        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{averageRating}</td>
              <td>{numVotes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

// Pre-Render the default 20 homepage results' pages
export async function generateStaticParams() {
  const { titles } = await fetchDefaultTitles()

  return titles.map((title) => ({
    id: title.id,
  }))
}
