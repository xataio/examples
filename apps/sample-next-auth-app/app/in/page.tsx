import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Profile } from '~/components/profile'

export default async function In() {
  const session = await getServerSession(authConfig)

  if (!session || !session.user) {
    redirect('/')
  }

  return <Profile user={session.user} />
}
