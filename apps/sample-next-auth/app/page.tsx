import { unstable_getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Home } from '~/shared/home'

export default async function Index() {
  const session = await unstable_getServerSession(authConfig)

  return <Home session={session} />
}
