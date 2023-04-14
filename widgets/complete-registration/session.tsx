import { Box, Text } from '@chakra-ui/react'

import { useAppSelector } from '@/redux/hooks'
import { selectStudent } from '@/redux/selectors'

import RegisteredSession from './registered-session'

const Session = () => {
  const student = useAppSelector(selectStudent)

  return (
    <>
      {process.env.NEXT_PUBLIC_SHOW_SESSION === 'true' ? (
        <RegisteredSession groupId={student!.registeredGroup!} />
      ) : (
        <>
          <Box mb={5} px={10} py={4} borderRadius="20px" bg="brandGrey.100">
            <Text textAlign="center" color="brand.900" size="md">
              {`💡 Recuerda consultar tu sesión 24 horas después de haberla registrado en este mismo espacio.`}
            </Text>
          </Box>

          <Box px={10} py={4} borderRadius="20px" bg="brandGrey.100">
            <Text textAlign="center" color="brand.900" size="md">
              {`💡 Recuerda que en este mismo espacio subirás tu apoyo visual el 14 de abril a las 11:30 al 17 de abril 23:59.`}
            </Text>
          </Box>
        </>
      )}
    </>
  )
}

export default Session
