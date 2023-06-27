import { getServerSession } from 'next-auth/next'
import { authConfig } from '~/app/api/auth/[...nextauth]/route'
import { Home } from '~/components/home'

export default async function Index() {
  const session = await getServerSession(authConfig)

  return <Home session={session} callbackUrl={'/in'} />
}
