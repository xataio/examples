import { NextApiHandler } from 'next'
import { authorize } from '../../util/authorize'
import { getXataClient } from '../../util/xata'

const handler: NextApiHandler = async (req, res) => {
  const { isAuthenticated } = await authorize(req)
  if (!isAuthenticated) {
    res.status(401).end()
    return
  }

  const { id } = req.body
  await getXataClient().db.items.delete(id)
  res.end()
}

export default handler
