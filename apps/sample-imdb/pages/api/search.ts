import { type NextApiRequest, type NextApiResponse } from 'next'
import { searchMovies } from '~/lib/db.server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { term } = req.query

  if (Array.isArray(term) || !term) {
    res.status(422).json({ message: 'term must be of type string' })
    return
  }

  console.log('going in')
  const records = await searchMovies(term)
  console.log('success')
  res.status(200).json(records)
  return
}
