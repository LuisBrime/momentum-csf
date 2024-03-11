import { FC, useCallback, useEffect, useState, ChangeEventHandler } from 'react'

import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
  useBoolean,
} from '@chakra-ui/react'
import { InfoOutlineIcon, Search2Icon } from '@chakra-ui/icons'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import { LoadingSpinner } from '@/components'
import { useResponseHandler } from '@/hooks'
import { getMonthString } from '@/lib/utils'
import { Program } from '@/lib/types'

interface StudentListProps {
  isUltraAdmin?: boolean
}

const StudentList: FC<StudentListProps> = ({ isUltraAdmin = false }) => {
  const [studentList, setStudentList] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, { on: loadingOn, off: loadingOff }] = useBoolean(false)

  const { push } = useRouter()
  const { handleResponse } = useResponseHandler()

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = event =>
    setSearch(event.target.value)

  const fetchStudents = useCallback(
    async (params?: Record<string, string>) => {
      let searchString = ''
      if (params) {
        const searchParams = new URLSearchParams(params)

        if (searchParams) {
          searchString = `?${searchParams.toString()}`
        }
      }

      loadingOn()

      let response
      try {
        response = await axios.get(`/api/admin/students${searchString}`)
      } catch (error) {
        response = (error as AxiosError).response!
      }

      const { shouldReturn } = await handleResponse(response.status)
      if (shouldReturn) return

      const {
        data: {
          data: { students },
        },
      } = response

      const studentList = (students as any[]).map(s => ({
        ...s,
        registrationDate: new Date(s.registrationDate),
      }))
      setStudentList(studentList)

      loadingOff()
    },
    [handleResponse, loadingOn, loadingOff],
  )

  const searchFetch = useCallback(
    async (search: string) => {
      if (isLoading) return

      let params: { matricula?: string; name?: string; program?: string } = {}
      if (search.length > 0) {
        if (search.includes('A0')) {
          params.matricula = search
        } else if (
          search.toLowerCase() === Program.PBT ||
          search.toLowerCase() === Program.PBM ||
          search.toLowerCase() === Program.PBI
        ) {
          params.program = search
        } else {
          params.name = search
        }
      }

      await fetchStudents(params)
    },
    [isLoading],
  )

  const dateToString = useCallback((date: Date) => {
    let finalS = ''
    finalS += `${date.getUTCDate()} de `
    finalS += `${getMonthString(date.getUTCMonth())}, `
    finalS += `${`0${date.getUTCHours() - 6}`.slice(-2)}:`
    finalS += `0${date.getUTCMinutes()}`.slice(-2)
    return finalS
  }, [])

  const getVisualSupportItem = useCallback(
    (visualSupport?: Record<string, any>) => {
      if (!visualSupport || Object.keys(visualSupport).length === 0) {
        return <Text>Sin soporte visual</Text>
      }

      return (
        <VStack spacing={2.5} align="center">
          <Text>
            Tipo:{' '}
            {`${visualSupport.type === 'physical' ? 'Físico' : 'Virtual'}`}
          </Text>
          {visualSupport.url && <Text>URL: {visualSupport.url}</Text>}
        </VStack>
      )
    },
    [],
  )

  const getGroupItem = useCallback((group?: string) => {
    if (!group) {
      return <Text>Sin registro</Text>
    }

    return (
      <HStack spacing={4.5}>
        <Text>{group}</Text>
      </HStack>
    )
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    searchFetch(search)
  }, [search])

  return (
    <Flex pos="relative" direction="column">
      <Box my={8} maxW="60%">
        <InputGroup colorScheme="brandGrey" size="md">
          <InputLeftElement>
            <Search2Icon color="brandGrey.300" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={handleSearchChange}
            colorScheme="brandGrey"
            color="brandGrey.100"
            type="text"
            placeholder="Matricula (A0...) o Apellido"
          />
        </InputGroup>
      </Box>

      <Box w="100%">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <TableContainer>
            <Table colorScheme="brand" size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th>Matricula</Th>
                  <Th>Nombres</Th>
                  <Th>Fecha y hora de registro</Th>
                  <Th>
                    <Tooltip
                      hasArrow
                      fontSize="sm"
                      label="Los estudiantes sin registro necesitan completarlo a través de la página web."
                    >
                      <HStack spacing={2.5} cursor="help">
                        <Text>Grupo Registrado</Text>
                        <InfoOutlineIcon />
                      </HStack>
                    </Tooltip>
                  </Th>
                  <Th>Soporte visual</Th>
                  <Th>Programa</Th>
                </Tr>
              </Thead>

              <Tbody color="brand.50">
                {studentList.map((student, index) => {
                  return (
                    <Tr
                      _hover={{
                        background: isUltraAdmin
                          ? 'brandSecondary.900'
                          : 'transparent',
                      }}
                      _active={{
                        background: isUltraAdmin
                          ? 'brandSecondary.600'
                          : 'transparent',
                      }}
                      onClick={async () => {
                        if (!isUltraAdmin) return
                        await push(`/admin/student/${student.id}`)
                      }}
                      key={`tb-sl-${index}`}
                      cursor={isUltraAdmin ? 'pointer' : undefined}
                    >
                      <Td>{`${student.id}`}</Td>
                      <Td>{`${student.name}`}</Td>
                      <Td>{dateToString(student.registrationDate)}</Td>
                      <Td>{getGroupItem(student.registeredGroup)}</Td>
                      <Td>{getVisualSupportItem(student.visualSupport)}</Td>
                      <Td>{`${student.program.toUpperCase()}`}</Td>
                    </Tr>
                  )
                })}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th>Matricula</Th>
                  <Th>Nombres</Th>
                  <Th>Fecha y hora de registro</Th>
                  <Th>Grupo Registrado</Th>
                  <Th>Soporte visual</Th>
                  <Th>Programa</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Flex>
  )
}

export default StudentList
