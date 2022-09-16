import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TableNames } from '../../_lib/types'
import 'isomorphic-fetch'
import { getXataClient } from '../../_lib/xata.codegen'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const xata = getXataClient()
  const table = request.query.table as TableNames

  const { filter, sort } = request.body ?? {}

  const hasFilter = !!filter
  const hasSort = !!sort

  if (request.method !== 'POST') {
    response.status(405).end('Only `POST` requests')
  }

  if (!table) {
    response.status(402).end('Must specificy table name')
  }

  try {
    if (hasFilter && hasSort) {
      response.json(
        await xata.db[table]
          // @ts-expect-error
          .filter(filter)
          .sort(sort.column, sort.direction)
          .getAll()
      )
    } else if (hasSort) {
      response.json(
        await xata.db[table]
          // @ts-expect-error
          .sort(sort.column, sort.direction)
          .getAll()
      )
    } else if (hasFilter) {
      // @ts-expect-error
      response.json(await xata.db[table].filter(filter).getAll())
    } else {
      response.json(await xata.db[table].getAll())
    }
  } catch (error) {
    response.status(400).json(error)
  }
}
