import { unstable_getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { Profile } from '~/shared/components/profile'

export default async function In() {
  const session = await unstable_getServerSession(authConfig)

  if (!session || !session.user) {
    redirect('/')
  }

  return <Profile user={session.user} />
}
