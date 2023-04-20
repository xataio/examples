import { z } from 'zod'

export const OMDBschema = z.object({
  Poster: z.string().nullish(),
  Plot: z.string().nullish(),
})

export type OMDBdata = z.infer<typeof OMDBschema>

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

const envVariables = z.object({
  XATA_API_KEY: z.string(),
  XATA_BRANCH: z.string(),
  VERCEL_URL: z.string().catch('http://localhost:3000'),
  OMDB_API_KEY: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
