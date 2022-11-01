import { Titles } from '~/lib/xata.codegen.server'

const url = process.env.VERCEL_URL

const search = async (term?: string): Promise<Titles[]> => {
  const response = await fetch(`${url}/api/search?term=${term}`)
  const { titles } = await response.json()
  return titles
}

export const MoviesList = async ({
  titles,
  term,
}: {
  titles: Titles[]
  term: string | null
}) => {
  const list = Boolean(term) && term !== null ? await search(term) : titles

  return (
    <ul className="grid grid-cols-2 gap-5 p-10">
      {list.map(
        ({ primaryTitle, genres, coverUrl, summary, averageRating }) => (
          <li
            key={JSON.stringify(genres) + primaryTitle}
            className="border-2 border-neutral-800 rounded-sm py-2 px-5 max-h-[26rem] overflow-hidden"
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
                  <picture>
                    <source srcSet={coverUrl} type="image/webp" />
                    <img
                      src={coverUrl}
                      alt={`Poster for "${primaryTitle}"`}
                      className="rounded-lg w-[200px] "
                    />
                  </picture>
                )}
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  )
}
