import { useCallback, useEffect, useState } from 'react'

import { Box, Center, Text, useBoolean } from '@chakra-ui/react'
import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth/next'
import axios, { AxiosError } from 'axios'

import { LoadingSpinner, Navbar } from '@/components'
import { useResponseHandler } from '@/hooks'
import * as db from '@/lib/db'
import { setStudent, setUserType } from '@/redux/reducers/student'
import { wrapper } from '@/redux/store'
import { StudentInfo } from '@/widgets/admin'

import { authOptions } from '../../api/auth/[...nextauth]'

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

const StudentAdminPage = () => {
  const [student, setStudent] = useState<any>()
  const [isLoading, { on: loadingOn, off: loadingOff }] = useBoolean(true)

  const { query } = useRouter()
  const { handleResponse } = useResponseHandler()

  const fetchStudent = useCallback(
    async (matricula: string) => {
      loadingOn()

      let response
      try {
        response = await axios.get(`/api/admin/students/${matricula}`)
      } catch (error) {
        response = (error as AxiosError).response!
      }

      const { shouldReturn } = await handleResponse(response.status)

      if (response.status !== 200 || shouldReturn) {
        loadingOff()
        return
      }

      const s = response.data.data
      setStudent({
        ...s,
        regsitrationDate: new Date(s.registrationDate),
      })
      loadingOff()
    },
    [handleResponse, loadingOn, loadingOff],
  )

  useEffect(() => {
    if (!query.matricula) return

    fetchStudent(query.matricula as string)
  }, [fetchStudent, query])

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
        {isLoading ? (
          <LoadingSpinner />
        ) : Boolean(student) ? (
          <StudentInfo student={student} />
        ) : (
          <Center>
            <Text
              textAlign="justify"
              color="white"
              fontSize={['sm', 'md', 'lg']}
            >
              No se pudo obtener la información del estudiante, verifica que la
              matrícula sea correcta e intenta de nuevo.
            </Text>
          </Center>
        )}
      </Box>
    </>
  )
}

export default StudentAdminPage
