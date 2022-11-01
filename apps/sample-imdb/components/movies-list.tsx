'use client'

import { type FC } from 'react'
import { Titles } from '~/lib/xata.codegen.server'

const search = async (term?: string) => {
  const response = await fetch(`/api/search?term=${term}`)

  return response.json()
}

export const MoviesList: FC<{ titles: Titles[] }> = ({ titles }) => {
  return (
    <ul className="grid grid-cols-2 gap-5 p-10">
      {titles.map(
        ({ primaryTitle, genres, coverUrl, summary, averageRating }) => (
          <li
            key={primaryTitle}
            className="border-2 border-neutral-800 rounded-sm py-2 px-5 max-h-[26rem]"
          >
            <div className="grid grid-cols-[1fr,auto] h-full">
              <h2 className="text-3xl mb-2 col-span-2">
                {primaryTitle} - {averageRating}
              </h2>
              <div className="grid grid-rows-[1fr,auto] h-full ">
                {summary && (
                  <p className="leading-7 text-md pr-2 text-neutral-300 self-center">
                    {summary.length > 260
                      ? summary.substring(0, 250) + '…'
                      : summary}
                  </p>
                )}
                <ul className="flex justify-start gap-2 mt-2">
                  {genres?.map((genre) => (
                    <li
                      key={primaryTitle + genre}
                      className="border-2 border-neutral-800 rounded-lg py-1 px-2"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              </div>
              <div className=" place-items-center grid">
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt={`Poster for "${primaryTitle}"`}
                    className="rounded-lg w-[200px] "
                  />
                )}
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  )
}
