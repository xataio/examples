import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
// import { getXataClient } from '../../_lib/xata.codegen'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // const xata = getXataClient()
  // const { id } = request.body

  if (request.method !== 'DELETE') {
    response.status(405).end('Only `DELETE` requests')
  }

  try {
    /**
     * @TODO
     * for the sake of demos, this endpoint is a no-op
     * uncomment the line below
     */
    // response.json(await xata.db.movies.delete({ id }))
    response.json({
      message: '🎉 Great success! Record deleted',
    })
  } catch (error) {
    response.status(400).json(error)
  }
}
