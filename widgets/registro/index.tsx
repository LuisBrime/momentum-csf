import { useCallback, useState } from 'react'

import { Button, Text } from '@chakra-ui/react'

import { useAppDispatch } from '@/redux/hooks'
import { setHasStartedRegistry } from '@/redux/reducers/student'

import ActualRegister from './actual-register'
import RegistroText from './registro-text'

interface RegistroStartProps {
  currentDate: Date
}

const RegistroStart = ({ currentDate }: RegistroStartProps) => {
  const [showRegister, setRegister] = useState(false)

  const dispatch = useAppDispatch()

  const startRegistry = useCallback(() => {
    dispatch(setHasStartedRegistry(true))
    setRegister(true)
  }, [dispatch])

  if (
    currentDate.getTime() > new Date(Date.UTC(2023, 5, 5, 17, 59)).getTime()
  ) {
    return (
      <Text color="white" size="md">
        El registro para las sesiones de Momentum ha terminado.
      </Text>
    )
  }

  return showRegister ? (
    <>
      <ActualRegister />
    </>
  ) : (
    <>
      <RegistroText />

      <Button
        onClick={() => startRegistry()}
        mt={4}
        w={32}
        colorScheme="brandSecondary"
        variant="outline"
      >
        Inicia tu registro
      </Button>
    </>
  )
}

export default RegistroStart
