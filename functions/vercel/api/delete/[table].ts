import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TableNames } from '../../_lib/types'
// import { getXataClient } from '../../_lib/xata.codegen'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // const xata = getXataClient()
  const table = request.query.table as TableNames

  // const { id } = request.body

  if (request.method !== 'DELETE') {
    response.status(405).end('Only `DELETE` requests')
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
    // response.json(await xata.db[table].delete({ id }))
    response.json({
      message: '🎉 Great success! Record deleted',
    })
  } catch (error) {
    response.status(400).json(error)
  }
}
