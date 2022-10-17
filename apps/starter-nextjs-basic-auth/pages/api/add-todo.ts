import { NextApiHandler } from 'next'
import { authorize } from '../../util/authorize'
import { getXataClient } from '../../util/xata'

const handler: NextApiHandler = async (req, res) => {
  const { isAuthenticated, username } = await authorize(req)
  if (!isAuthenticated) {
    res.status(401).end()
    return
  }

  const { label, is_done } = req.body
  const xata = getXataClient()
  const user = await xata.db.users.filter({ username }).getFirst()
  await xata.db.items.create({ label, user: { id: user.id } })
  res.end()
}

export default handler
