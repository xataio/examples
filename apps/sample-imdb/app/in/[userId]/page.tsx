import { currentUser } from '@clerk/nextjs/app-beta'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { MoviesList } from '~/components/movies-list'
import { getLikedMovies, getLikesList } from '~/lib/db.server'

export default async function LikeList() {
  const user = await currentUser()

  if (user === null) {
    redirect('/')
  }

  const resp = await getLikesList(user.id)
  const movieListDetails = getLikedMovies(resp?.titles ?? [])

  return (
    <article>
      <header className="mt-5 p-24 grid place-items-center bg-gradient-to-tr from-pink-500 to-violet-500">
        <h1 className="text-8xl font-bold text-black">
          {user?.firstName} {user?.lastName}’s likes
        </h1>
      </header>
      <ul className="py-12">
        <Suspense fallback="Comming soon...">
          {/** @ts-expect-error Server Component */}
          <MoviesList titles={await movieListDetails} />
        </Suspense>
      </ul>
    </article>
  )
}
