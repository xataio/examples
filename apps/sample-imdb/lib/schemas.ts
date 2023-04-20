import { z } from 'zod'

export const OMDBschema = z.object({
  Poster: z.string().nullish(),
  Plot: z.string().nullish(),
})

export const movie = z.object({
  id: z.string(),
  isAdult: z.boolean().catch(true),
  numVotes: z.number().nullish(),
  titleType: z.string().nullish(),
  primaryTitle: z.string().nullish(),
  originalTitle: z.string().nullish(),
  startYear: z.number().nullish(),
  endYear: z.number().nullish(),
  runtimeMinutes: z.number().nullish(),
  averageRating: z.number().nullish(),
  coverUrl: z.string().nullish(),
  summary: z.string().catch('to be defined'),
  genres: z.array(z.string()).catch([]),
})

export const movieList = z.array(movie)

export type OMDBdata = z.infer<typeof OMDBschema>
