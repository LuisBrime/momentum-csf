import { Box, Flex, Heading } from '@chakra-ui/react'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'

import { Navbar } from '@/components'
import * as db from '@/lib/db'
import { useAppSelector } from '@/redux/hooks'
import { setStudent, setUserType } from '@/redux/reducers/student'
import { selectStudent, selectUserType } from '@/redux/selectors'
import { wrapper } from '@/redux/store'
import { StudentList } from '@/widgets/admin'

import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    const id = session.user!.email!.split('@')[0].toUpperCase()
    const student = await db.Student.retrieveStudent(id)
    store.dispatch(setStudent(student!))

    // @ts-ignore
    const userType = session!.userType ?? 0
    store.dispatch(setUserType(userType))
    if (userType === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return { props: {} }
  },
)

const AdminHome = () => {
  const student = useAppSelector(selectStudent)
  const userType = useAppSelector(selectUserType)

  return (
    <>
      <Navbar />

      <Box
        pb={7}
        px={[2.5, 5, 10]}
        py={10}
        borderRadius="5px"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        w="100%"
        bg="momentumBlack"
      >
        <Flex direction="column">
          <Heading mb={8} color="white" size="md">
            {`¡Hola ${student!.name}!`}
          </Heading>

          <StudentList isUltraAdmin={userType === 2} />
        </Flex>
      </Box>
    </>
  )
}

export default AdminHome
