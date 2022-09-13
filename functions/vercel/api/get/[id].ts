/**
 *
 * @method GET
 * @query ID
 * @return JSON
 *
 * @endpoint /get/[id]
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getXataClient } from '../../_lib/xata.codegen'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { id } = request.query

  if (request.method !== 'GET') {
    response.status(405).end('Only `GET` requests')
    return
  }

  if (typeof id !== 'string') {
    response.status(402).end("Can't get by ID without an `id`")
    return
  }

  const xata = getXataClient()
  const record = await xata.db.records.filter({ id }).getFirst()

  response.json(record)
}
