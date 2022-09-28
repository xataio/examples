import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { withErrorHandler } from '../../_lib/helpers'
// import { getXataClient } from '../../_lib/xata.codegen'

async function handler(req: VercelRequest, res: VercelResponse) {
  // const xata = getXataClient()
  // const { id } = request.body

  if (req.method !== 'DELETE') {
    throw {
      status: 405,
      message: 'Only `DELETE` requests',
    }
  }

  /**
   * @TODO
   * for the sake of demos, this endpoint is a no-op
   * uncomment the line below
   */
  // response.json(await xata.db.movies.delete({ id }))
  res.json({
    message: '🎉 Great success! Record deleted',
  })
}

export default withErrorHandler(handler)
