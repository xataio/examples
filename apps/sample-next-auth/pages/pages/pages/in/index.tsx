import { Session, unstable_getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { InferGetServerSidePropsType } from 'next'

export default function In({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1>Hello, {user?.name ?? user?.email}!</h1>
      <Image
        src={user?.image ?? '/xatafly-colored.svg'}
        alt={`photo of ${user?.name}`}
        width="460"
        height="460"
        priority
      />
    </>
  )
}

export const getServerSideProps = async () => {
  const { user } = (await unstable_getServerSession(authConfig)) as Session

  if (user === null) {
    redirect('/')
  }

  return {
    props: { user },
  }
}
