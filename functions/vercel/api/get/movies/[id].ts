import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getXataClient } from '../../../_lib/xata.codegen'
// import { XataRecord } from '@xata.io/client'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const id = String(request.query.id ?? '') // example: 'rec_cci5p8miqtgok3idj8b0'

  if (request.method !== 'GET') {
    response.status(405).end('Only `GET` requests')

    return
  }

  const xata = getXataClient()
  try {
    response.json(await xata.db.movies.filter({ id }).getFirst())

    return
  } catch (error) {
    response.status(400).json(error)

    return
  }
}
