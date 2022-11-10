export default function Head() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <title key="title">XMDB: Xata Movie Database</title>

      <meta
        name="description"
        content="Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over 9 million records)."
        key="description"
      />

      <meta
        property="og:image"
        content={`${process.env.VERCEL_URL}/xmdb-og.png`}
        key="og:image"
      />
      <meta
        property="og:title"
        content="XMDB: Xata Movie Database"
        key="og:title"
      />
      <meta
        property="og:description"
        content="Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over 9 million records)."
        key="og:description"
      />
      <meta property="og:type" content="website" />

      <meta
        property="twitter:image"
        content={`${process.env.VERCEL_URL}/xmdb-og.png`}
        key="twitter:image"
      />
      <meta
        property="twitter:title"
        content="XMDB: Xata Movie Database"
        key="twitter:title"
      />
      <meta
        property="twitter:description"
        content="Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over 9 million records)."
        key="twitter:description"
      />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  )
}
