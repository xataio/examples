import { unstable_getServerSession } from 'next-auth'
import { authConfig } from '~/pages/api/auth/[...nextauth]'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { Logout } from '~/shared/components/logout'
import { Profile } from '~/shared/components/profile'
import { Footer } from '~/shared/components/footer'

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
      <Footer />
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
