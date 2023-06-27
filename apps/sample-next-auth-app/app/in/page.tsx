import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authConfig } from '~/app/api/auth/[...nextauth]/route'
import { Profile } from '~/components/profile'

export default async function In() {
  const session = await getServerSession(authConfig)

  if (!session || !session.user) {
    redirect('/')
  }

  return <Profile user={session.user} />
}
