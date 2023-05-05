import { Text } from '@chakra-ui/react'
import axios from 'axios'

import { useAppSelector } from '@/redux/hooks'
import { selectStudent } from '@/redux/selectors'
import { useCallback, useEffect, useState } from 'react'

import EvidenciaRegister from './evidencias-register'

const Evidencias = () => {
  const [currentDate, setCurrentDate] = useState<Date>()

  const student = useAppSelector(selectStudent)

  const fetchDate = useCallback(async () => {
    const {
      data: { data },
    } = await axios.get('/api/time')
    setCurrentDate(new Date(data))
  }, [])

  useEffect(() => {
    fetchDate()
  }, [fetchDate])

  if (currentDate && currentDate!.getTime() >= Date.UTC(2023, 5, 5, 17, 59)) {
    return (
      <Text color="white" size="md">
        El registro de apoyo visual ha terminado.
      </Text>
    )
  }

  return student?.visualSupport ? (
    <Text color="white" size="md">
      Ya registraste tu apoyo visual
    </Text>
  ) : (
    <EvidenciaRegister />
  )
}

export default Evidencias
