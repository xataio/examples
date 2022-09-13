/**
 *
 * @method POST
 * @query table
 * @return JSON
 *
 * @endpoint /query/[table]
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { DatabaseSchema } from '../../_lib/xata.codegen'
import { getXataClient } from '../../_lib/xata.codegen'

type TableNames = keyof DatabaseSchema

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const xata = getXataClient()
  const table = request.query.table as TableNames

  const { filter, sort } = request.body

  const hasFilter = !!filter
  const hasSort = !!sort

  if (request.method !== 'POST') {
    response.status(405).end('Only `POST` requests')
  }

  if (!table) {
    response.status(402).end('Must specificy table name')
  }

  let data = {}
  try {
    if (hasFilter && hasSort) {
      data = await xata.db[table]
        .filter(filter)
        .sort(sort.column, sort.direction)
        .getAll()
    } else if (hasSort) {
      data = await xata.db[table].sort(sort.column, sort.direction).getAll()
    } else if (hasFilter) {
      data = await xata.db[table].filter(filter).getAll()
    } else {
      data = await xata.db[table].getAll()
    }
  } catch (error) {
    // if request to Xata fails,
    // forward error for Client to handle
    data = error
  }

  response.json(data)
}
