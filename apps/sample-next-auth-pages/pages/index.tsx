import { useSession } from 'next-auth/react'
import { Home } from '~/components/home'

export default function Index() {
  const { data: session } = useSession()

  return <Home session={session} callbackUrl="/in" />
}
