import Link from 'next/link'
import { Titles } from '~/lib/xata.codegen.server'
import { Rating } from './ratings'

const MovieCard = ({ data }: { data: Titles }) => {
  const { primaryTitle, genres, coverUrl, summary, averageRating, id } = data

  return (
    <li className="border-2 bg-black border-neutral-800 hover:border-pink-500 transition rounded-sm py-2 px-5 lg:max-h-[26rem] overflow-hidden focus-within:scale-105 hover:scale-105">
      <div className="grid grid-cols-[1fr,auto] h-full">
        <h2 className="lg:text-3xl text-5xl mb-2 col-span-2">
          <Link
            className="hover:text-pink-500 focus:text-pink-500"
            href={`/movie/${id}/`}
          >
            {primaryTitle}
          </Link>
          {averageRating ? <Rating value={averageRating} /> : null}
        </h2>
        <div className="grid grid-rows-[1fr,auto] h-full ">
          {summary && (
            <p className="leading-7 lg:text-md  text-lg pr-2 text-neutral-300 self-center">
              {summary.length > 260 ? summary.substring(0, 250) + '…' : summary}
            </p>
          )}
          <ul className="flex justify-start gap-2 mt-2">
            {genres?.map((genre) => (
              <li
                key={id + genre}
                className="border-2 border-neutral-800 rounded-lg py-1 px-2"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
        <div className=" place-items-center grid overflow-hidden">
          {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') && (
            <picture>
              <source srcSet={coverUrl} type="image/webp" />
              <img
                src={coverUrl}
                alt={`Poster for "${primaryTitle}"`}
                className="rounded-lg w-[150px] "
              />
            </picture>
          )}
        </div>
      </div>
    </li>
  )
}

export const MoviesList = async ({ titles }: { titles: Titles[] }) => {
  return (
    <ul className=" grid xl:grid-cols-3 lg:grid-cols-2 gap-5 px-10 max-w-[100rem] mx-auto">
      {titles.map((movie) => (
        <MovieCard key={movie.id} data={movie} />
      ))}
    </ul>
  )
}
