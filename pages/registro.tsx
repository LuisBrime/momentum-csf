import { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Flex, Heading, Text, chakra } from '@chakra-ui/react'
import axios from 'axios'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'

import { Navbar } from '@/components'
import * as db from '@/lib/db'
import { getMonthString } from '@/lib/utils'
import { useAppSelector } from '@/redux/hooks'
import { setStudent, setUserType } from '@/redux/reducers/student'
import { selectHasStartedRegistry, selectStudent } from '@/redux/selectors'
import { wrapper } from '@/redux/store'
import { CompleteRegistration, RegistroWidget } from '@/widgets'

import { authOptions } from './api/auth/[...nextauth]'

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
    if (userType !== 0) {
      return {
        redirect: {
          destination: '/admin/home',
          permanent: false,
        },
      }
    }

    return { props: {} }
  },
)

const RegistroPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>()
  const [shownRegisterTime, setShownRT] = useState<string>()
  const [reloadTimeTime, setTime] = useState(0)

  const student = useAppSelector(selectStudent)
  const hasStartedRegistry = useAppSelector(selectHasStartedRegistry)

  const studentRegisterTime = useMemo(
    () => new Date(student!.registrationDate),
    [student],
  )
  const canRegister = useMemo(() => {
    return (
      student?.registeredGroup ||
      (currentDate && currentDate!.getTime() >= studentRegisterTime.getTime())
    )
  }, [currentDate, studentRegisterTime, student?.registeredGroup])

  const fetchTime = useCallback(async () => {
    setTime(10)
    const {
      data: { data },
    } = await axios.get('/api/time')
    setCurrentDate(new Date(data))
  }, [])

  useEffect(() => {
    const day = studentRegisterTime.getUTCDate()
    const month = getMonthString(studentRegisterTime.getUTCMonth())
    const hour = `0${studentRegisterTime.getUTCHours() - 6}`.slice(-2)
    const minutes = `0${studentRegisterTime.getUTCMinutes()}`.slice(-2)
    setShownRT(`${day} de ${month}, ${hour}:${minutes}`)
  }, [studentRegisterTime])

  useEffect(() => {
    if (hasStartedRegistry || student?.registeredGroup || canRegister) {
      return
    }

    if (reloadTimeTime > 0) {
      setTimeout(() => setTime(reloadTimeTime - 1), 100)
    } else if (reloadTimeTime === 0) {
      fetchTime()
    }
  }, [
    canRegister,
    hasStartedRegistry,
    fetchTime,
    reloadTimeTime,
    student?.registeredGroup,
  ])

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
          <Heading mb={3} color="white" size="md">
            {`¡Hola ${student!.name}!`}
          </Heading>

          {canRegister ? (
            student!.registeredGroup ? (
              <CompleteRegistration />
            ) : (
              <RegistroWidget currentDate={currentDate!} />
            )
          ) : (
            <>
              <Text mb={2.5} color="white" size="md">
                Tu registro estará disponible apartir del
                <chakra.span
                  fontWeight={600}
                  fontSize="lg"
                  color="brandSecondary.500"
                >
                  {` ${shownRegisterTime}`}
                </chakra.span>
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default RegistroPage
