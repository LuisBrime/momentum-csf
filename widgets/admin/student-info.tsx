import { FC, useCallback, useEffect, useState } from 'react'

import { Box, HStack, IconButton, VStack } from '@chakra-ui/react'

import { LabeledData } from '@/components'
import { ClientStudent } from '@/lib/types'
import { getMonthString } from '@/lib/utils'
import { EditIcon } from '@chakra-ui/icons'

interface StudentInfoProps {
  student: ClientStudent
}

interface SessionLabelProps {
  onEdit: () => void
  session: string | null
}

const SessionLabel: FC<SessionLabelProps> = ({ onEdit, session }) => {
  return (
    <HStack>
      <LabeledData text={session ?? 'Sin registro'} title="Sesión Registrada" />

      {session && (
        <IconButton
          onClick={onEdit}
          variant="outline"
          colorScheme="brandSecondary"
          aria-label="Editar sesiòn registrada"
          icon={<EditIcon />}
        />
      )}
    </HStack>
  )
}

const StudentInfo: FC<StudentInfoProps> = ({ student }) => {
  const [registrationDate, setRegDate] = useState<string>()

  const dateToString = useCallback((date: Date) => {
    let finalS = ''
    finalS += `${date.getUTCDate()} de `
    finalS += `${getMonthString(date.getUTCMonth())}, `
    finalS += `${`0${date.getUTCHours() - 6}`.slice(-2)}:`
    finalS += `0${date.getUTCMinutes()}`.slice(-2)
    return finalS
  }, [])

  useEffect(() => {
    const d = new Date(student.registrationDate)
    setRegDate(dateToString(d))
  }, [student.registrationDate])

  return (
    <Box w="100%" px={8} py={6}>
      <VStack spacing={7} align="flex-start" w="100%">
        <HStack spacing={10} w="100%">
          <LabeledData text={student.id} title="Matricula" w="10%" />
          <LabeledData text={student.name} title="Nombre" w="40%" />
          <LabeledData text={student.program.toUpperCase()} title="Programa" />
        </HStack>

        <HStack spacing={10} w="100%">
          <LabeledData
            text={registrationDate ?? ''}
            title="Fecha de Registro"
          />
          <SessionLabel session={student.registeredGroup} onEdit={() => {}} />
        </HStack>

        {student.visualSupport &&
          Object.keys(student.visualSupport).length > 0 && (
            <HStack spacing={10} w="100%">
              <LabeledData text={student.visualSupport!.type} title="Tipo" />
              (student.visualSupport!.url &&{' '}
              <LabeledData text={student.visualSupport!.url!} title="URL" />)
            </HStack>
          )}
      </VStack>
    </Box>
  )
}

export default StudentInfo
