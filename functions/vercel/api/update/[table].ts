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
// import { getXataClient } from '../../_lib/xata.codegen'

type TableNames = keyof DatabaseSchema

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // const xata = getXataClient()
  const table = request.query.table as TableNames
  // const { id, data } = request.body

  if (request.method !== 'PATCH') {
    response.status(405).end('Only `PATCH` requests')
  }

  if (!table) {
    response.status(402).end('Must specificy table name')
  }
  try {
    /**
     * @TODO
     * for the sake of demos, this endpoint is a no-op
     * uncomment the line below
     */
    // response.json({await xata.db[table].update({ id, ...data }))
    response.json({
      message: '🎉 Great success! Record updated',
    })
  } catch (error) {
    response.status(400).json(error)
  }
}
