import { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import axios from 'axios'

import { ClientGroup } from '@/lib/types'

interface RegisteredSessionProps {
  groupId: string
}

const RegisteredSession = ({ groupId }: RegisteredSessionProps) => {
  const [group, setGroup] = useState<ClientGroup>()

  const fetchGroup = useCallback(async () => {
    const {
      data: { data },
    } = await axios.get(`/api/groups/${groupId}`)
    setGroup(data)
  }, [groupId])

  useEffect(() => {
    fetchGroup()
  }, [fetchGroup])

  return group ? (
    <Box w="100%">
      <TableContainer>
        <Table colorScheme="brand" size="lg" variant="simple">
          <TableCaption>Sesión Registrada</TableCaption>
          <Thead>
            <Tr>
              <Th>No. de Sesión</Th>
              <Th>Horario</Th>
              <Th>Moderador</Th>
              <Th>Evaluadores</Th>
              <Th>Salón</Th>
            </Tr>
          </Thead>

          <Tbody color="brand.50">
            {(function () {
              const actualDate = new Date(group.sessionDate!)
              return (
                <Tr>
                  <Td>{group!.id}</Td>
                  <Td>{`${`0${actualDate.getUTCHours() - 6}`.slice(
                    -2,
                  )}:${`0${actualDate.getUTCMinutes()}`.slice(-2)}`}</Td>
                  <Td>{group!.moderator}</Td>
                  <Td>
                    {group.evaluators!.map((e, i) => (
                      <Text key={`gp-${i}`}>{e}</Text>
                    ))}
                  </Td>
                  <Td>{group!.salon}</Td>
                </Tr>
              )
            })()}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <></>
  )
}

export default RegisteredSession
