import { NextApiHandler } from 'next'
import { authorize } from '../../util/authorize'
import { getXataClient } from '../../util/xata'

const handler: NextApiHandler = async (req, res) => {
  const { isAuthenticated } = await authorize(req)
  if (!isAuthenticated) {
    res.status(401).end()
    return
  }

  const { id, is_done } = req.body
  const xata = getXataClient()
  await xata.db.items.update({ id, is_done })
  res.end()
}

export default handler
