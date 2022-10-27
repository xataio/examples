import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { getXataClient } from '~/lib/xata.codegen.server'
// import { lte } from '@xata.io/client'
import { HeaderNav } from '~/components/header-nav'

const Home = ({
  titles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(titles)
  return (
    <>
      <Head>
        <title>XMDB</title>
        <meta name="description" content="Xata Movie Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-rows-[auto,1fr,auto] h-screen">
        <HeaderNav />
        <article>
          {titles.length < 1 ? null : (
            <ul>
              {titles.map(({ primaryTitle, genres }) => (
                <li key={primaryTitle} className="bg-neutral-800 my-3 p-5">
                  <strong>{primaryTitle}</strong>
                  <ul>
                    {genres?.map((genre) => (
                      <li key={primaryTitle + genre}>{genre}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </article>
        <footer className="flex justify-center items-center gap-2 py-3">
          <span>Powered by</span>

          <a
            className="inline-block"
            href="https://xata.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            <object
              data="/xatafly.svg"
              aria-label="Xata Logo"
              className="w-8"
            />
          </a>
        </footer>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const xata = getXataClient()

  const { records: titleRecords } = await xata.db.titles
    .filter({
      $exists: 'startYear',
      titleType: 'movie',
      isAdult: false,
    })
    .filter({
      startYear: new Date().getFullYear(),
    })
    .sort('startYear', 'desc')
    .getPaginated({
      pagination: {
        size: 20,
      },
    })

  return {
    props: {
      titles: titleRecords,
    },
  }
}

export default Home
