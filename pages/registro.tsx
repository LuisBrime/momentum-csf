import type { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

import { firebaseAdmin } from '@/lib/auth/admin'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (process.env.NODE_ENV === 'development') return { props: {} }

  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { email } = token

    return { props: {} }
  } catch (ignore) {
    // console.log(ignore)
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
}

const RegistroPage = () => {
  return <></>
}

export default RegistroPage
