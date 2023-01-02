import { useSession } from 'next-auth/react'
import { Home } from '~/shared/components/home'

export default function Index() {
  const { data: session } = useSession()

  return <Home session={session} callbackUrl="/pages/in" />
}
