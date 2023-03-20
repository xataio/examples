import { getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Home } from '~/components/home'

export default async function Index() {
  const session = await getServerSession(authConfig)

  return <Home session={session} callbackUrl={'/in'} />
}
