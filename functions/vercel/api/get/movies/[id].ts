import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getXataClient } from '../../../_lib/xata.codegen'
import { withErrorHandler } from '../../../_lib/helpers'
// import { XataRecord } from '@xata.io/client'

async function handler(request: VercelRequest, res: VercelResponse) {
  const id = String(request.query.id ?? '') // example: 'rec_cci5p8miqtgok3idj8b0'

  if (request.method !== 'GET') {
    throw { message: 'Only `GET` requests', status: 405 }
  }

  const xata = getXataClient()

  res.json((await xata.db.movies.filter({ id }).getFirst()) ?? {})
}

export default withErrorHandler(handler)
