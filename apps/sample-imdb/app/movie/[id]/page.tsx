import { HeaderNav } from '~/components/header-nav'
import { Rating } from '~/components/ratings'
import { fetchDefaultTitles, getMovie } from '~/lib/db.server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const movie = await getMovie(id)
  const title = `${movie?.primaryTitle} - XMDB`
  const description =
    movie?.summary || `Page for title: ${movie?.primaryTitle} on XMDB`

  const image = `${process.env.VERCEL_URL}/api/og?title=${encodeURI(
    title
  )}&image=${movie?.coverUrl && encodeURI(movie?.coverUrl)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  }
}

export default async function Movie({ params }: { params: { id: string } }) {
  const { id } = params
  const movie = await getMovie(id)

  if (movie === null) return notFound()

  const {
    coverUrl = '',
    primaryTitle,
    summary,
    startYear,
    genres,
    runtimeMinutes,
    averageRating,
    numVotes,
  } = movie
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
        <article className="grid lg:grid lg:grid-cols-2 max-w-5xl mx-auto gap-5 p-5 ">
          <section className="grid place-items-center">
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
          </section>
          <section className="leading-8 ">
            {genres && genres.length > 0 && (
              <ul className="flex gap-2 mb-8">
                {genres?.map((genre) => (
                  <li
                    key={id + genre}
                    className="border-2 border-neutral-800 rounded-lg py-1 px-2"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            )}
            <p className="max-w-prose mx-auto">{summary}</p>
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
