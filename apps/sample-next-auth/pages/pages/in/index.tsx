import { unstable_getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { Logout } from '~/shared/logout'
import { Profile } from '~/shared/profile'

export default function In({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Boolean(user) && (
        <aside>
          <Logout callbackUrl="/pages" />
        </aside>
      )}
      <Profile user={user} />
    </>
  )
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(req, res, authConfig)

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/pages',
        permanent: false,
      },
    }
  }

  return {
    props: { user: session.user },
  }
}
