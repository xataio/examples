import { getMovie } from '~/lib/db.server'

export default async function Head({ params }: { params: { id: string } }) {
  const { id } = params
  const movie = await getMovie(id)

  const title = `${movie?.primaryTitle} - XMDB`
  const description =
    movie?.summary || `Page for title: ${movie?.primaryTitle} on XMDB`

  const image = `${process.env.VERCEL_URL}/api/og?title=${encodeURI(
    title
  )}&image=${movie?.coverUrl && encodeURI(movie?.coverUrl)}`

  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <title key="title">{title}</title>
      <meta property="twitter:title" content={title} key="twitter:title" />
      <meta property="og:title" content={title} key="og:title" />
      <meta name="description" content={description} key="description" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        property="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta property="og:image" content={image} key="og:image" />
      <meta property="twitter:image" content={image} key="twitter:image" />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  )
}
