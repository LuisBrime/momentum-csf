import { useCallback, useState } from 'react'

import { Button } from '@chakra-ui/react'

import { useAppDispatch } from '@/redux/hooks'
import { setHasStartedRegistry } from '@/redux/reducers/student'

import ActualRegister from './actual-register'
import RegistroText from './registro-text'

const RegistroStart = () => {
  const [showRegister, setRegister] = useState(false)

  const dispatch = useAppDispatch()

  const startRegistry = useCallback(() => {
    dispatch(setHasStartedRegistry(true))
    setRegister(true)
  }, [dispatch])

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
        colorScheme="brand"
        variant="outline"
      >
        Inicia tu registro
      </Button>
    </>
  )
}

export default RegistroStart
