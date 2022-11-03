import { HeaderNav } from '~/components/header-nav'
import { Rating } from '~/components/ratings'
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
    <main>
      <HeaderNav searchTerm={''} />
      <div className=" place-items-center grid">
        <header className="mb-10">
          <h1 className="text-6xl">{primaryTitle}</h1>
          {startYear && (
            <time className="text-right block" dateTime={String(startYear)}>
              ({startYear})
            </time>
          )}
          {averageRating ? (
            <>
              <Rating value={averageRating} />
              <small>({numVotes?.toLocaleString('en-Us')} votes)</small>
            </>
          ) : null}
        </header>
        <article className="grid grid-cols-2 max-w-5xl mx-auto gap-5 p-5 ">
          <section>
            {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') && (
              <picture>
                <source srcSet={coverUrl} type="image/webp" />
                <img
                  src={coverUrl}
                  alt={`Poster for "${primaryTitle}"`}
                  className="rounded-lg "
                />
              </picture>
            )}
            <ul className="flex justify-center gap-2 mt-2">
              {genres &&
                genres.length > 0 &&
                genres?.map((genre) => (
                  <li
                    key={id + genre}
                    className="border-2 border-neutral-800 rounded-lg py-1 px-2"
                  >
                    {genre}
                  </li>
                ))}
            </ul>
          </section>
          <section className=" leading-8 self-center ">
            <p>{summary}</p>
            <p className="text-right text-neutral-400">
              Duration: {runtimeMinutes} minutes.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}

// Pre-Render the default 20 homepage results' pages
export async function generateStaticParams() {
  const { titles } = await fetchDefaultTitles()

  return titles.map((title) => ({
    id: title.id,
  }))
}
