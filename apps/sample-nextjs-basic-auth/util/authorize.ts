import { IncomingMessage } from 'http'
import { getXataClient } from './xata'
import bcrypt from 'bcrypt'
import { promisify } from 'util'

const compare = promisify(bcrypt.compare)
const hash = promisify(bcrypt.hash)

type OurAuthResponse = { username?: string; isAuthenticated: boolean }

export const authorize = async (
  req: IncomingMessage
): Promise<OurAuthResponse> => {
  const { authorization } = req.headers
  if (!authorization) {
    return { isAuthenticated: false }
  }

  // authorization: "Basic base64(username:password)"
  const [, credentials] = authorization.split(' ')
  const [username, password] = Buffer.from(credentials, 'base64')
    .toString('utf-8')
    .split(':')

  const xata = getXataClient()
  const user = await xata.db.users.filter({ username }).getFirst()

  // user doesn't exist
  if (!user) {
    await xata.db.users.create({
      username,
      password: await hash(password, 10),
    })
    return { isAuthenticated: true, username }
  }

  // user exists, we have the password
  const passwordsMatch = compare(password, user.password as string)

  if (!passwordsMatch) {
    return { isAuthenticated: false, username }
  }

  return { isAuthenticated: true, username }
}
