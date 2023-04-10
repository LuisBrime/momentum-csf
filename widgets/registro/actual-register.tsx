import { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  Stack,
  Table,
  TableContainer,
  Text,
  Thead,
  Th,
  Tr,
  Tbody,
  Tfoot,
  Td,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

import { ClientGroup } from '@/lib/types'
import { useAppDispatch } from '@/redux/hooks'
import { setStudent } from '@/redux/reducers/student'

const ActualRegister = () => {
  const [isLoading, { off: loadingOff, on: loadingOn }] = useBoolean(false)
  const [groups, setGroups] = useState<ClientGroup[]>([])
  const [selectedGroup, setSelected] = useState<string>()
  const [timeLeft, setTimeLeft] = useState(0)

  const toast = useToast()

  const dispatch = useAppDispatch()

  const selectGroup = useCallback(
    (groupId: string) => {
      if (isLoading) return
      setSelected(groupId)
    },
    [isLoading],
  )

  const fetchGroups = useCallback(async () => {
    setTimeLeft(10)

    const {
      data: { data },
    } = await axios.get('/api/groups')
    setGroups(data)
  }, [])

  const onRegister = useCallback(async () => {
    loadingOn()
    const resp = await axios.patch('/api/students', { groupId: selectedGroup })
    if (resp.status !== 201) {
      toast.closeAll()
      if (resp.status === 400) {
        toast({
          title: `Sesión llena`,
          description: `La sesión que seleccionaste ya llenó su cupo, por favor intenta con otra.`,
          status: `error`,
          duration: 1500,
          isClosable: true,
        })
      } else {
        toast({
          title: `Error de registro`,
          description: `Ocurrió un error al hacer tu registro, por favor inicia una nueva sesión e intenta de nuevo.`,
          status: `error`,
          duration: 1500,
          isClosable: true,
        })
      }
      loadingOff()
      return
    }

    const {
      data: { data: student },
    } = resp
    console.log(student)
    dispatch(setStudent(student))
    loadingOff()
  }, [dispatch, loadingOff, loadingOn, toast, selectedGroup])

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      fetchGroups()
    }
  }, [fetchGroups, timeLeft])

  return (
    <Flex pos="relative" direction="column">
      <Text color="white" size="md">
        ¡Selecciona una sesión y regístrate!
      </Text>

      <Box
        my={5}
        px={10}
        py={4}
        top={0}
        left={0}
        borderRadius="20px"
        pos="sticky"
        w="100%"
        bg="brandGrey.100"
      >
        <Stack direction="row" align="center" justifyContent="space-between">
          <Text color="brand.900" fontWeight={600}>
            {`💡 La lista se actualizará en ${timeLeft} segundos`}
          </Text>

          <Box h={8} w={32}>
            {selectedGroup && (
              <Button
                onClick={() => onRegister()}
                isLoading={isLoading}
                h={8}
                w={32}
                colorScheme="brand"
                variant="outline"
              >
                Registrar
              </Button>
            )}
          </Box>
        </Stack>
      </Box>

      {groups.length !== 0 && (
        <Box w="100%">
          <TableContainer>
            <Table size="lg" variant="simple">
              <Thead>
                <Tr>
                  <Th>No. de Sesión</Th>
                  <Th>Horario</Th>
                  <Th>Moderador</Th>
                  <Th>Evaluadores</Th>
                  <Th>Salón</Th>
                </Tr>
              </Thead>

              <Tbody>
                {groups.map((group, index) => {
                  const actualDate = new Date(group.sessionDate)
                  return (
                    <Tr
                      onClick={() => selectGroup(group.id)}
                      bg={
                        selectedGroup === group.id ? 'brand.100' : 'transparent'
                      }
                      key={`tb-gp-${index}`}
                      cursor={isLoading ? 'default' : 'pointer'}
                    >
                      <Td>{`${group.id}`}</Td>
                      <Td>{`${actualDate.getHours()}:${actualDate.getMinutes()}`}</Td>
                      <Td>{`${group.moderator}`}</Td>
                      <Td>
                        {group.evaluators.map((e, i) => (
                          <Text key={`tb-gp-${index}-ev-${i}`}>{e}</Text>
                        ))}
                      </Td>
                      <Td>{`${group.salon}`}</Td>
                    </Tr>
                  )
                })}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th>No. de Sesión</Th>
                  <Th>Horario</Th>
                  <Th>Moderador</Th>
                  <Th>Evaluadores</Th>
                  <Th>Salón</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Flex>
  )
}

export default ActualRegister
