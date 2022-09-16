/**
 *
 * @method GET
 * @query ID
 * @return JSON
 *
 * @endpoint /get/[id]
 */
import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TableNames } from '../../../_lib/types'
import { getXataClient } from '../../../_lib/xata.codegen'
// import { XataRecord } from '@xata.io/client'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const table = request.query.table as TableNames
  const id = request.query.id as string
  // const id = 'rec_cci5p8miqtgok3idj8b0'

  if (request.method !== 'GET') {
    response.status(405).end('Only `GET` requests')
    return
  }

  if (typeof id !== 'string') {
    response.status(402).end("Can't get by ID without an `id`")
    return
  }

  const xata = getXataClient()
  try {
    switch (table) {
      case 'movies':
        response.json(await xata.db.movies.filter({ id }).getFirst())
      case 'series':
        const responseData = await xata.db.series.filter({ id }).getFirst()
        if (responseData === null) {
          throw new Error('Record not found')
        }
        response.json(responseData)
    }
  } catch (error) {
    response.status(400).json(error)
  }
}
