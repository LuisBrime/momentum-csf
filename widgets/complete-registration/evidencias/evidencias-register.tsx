import { useCallback, useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

import { useAppDispatch } from '@/redux/hooks'
import { setStudent } from '@/redux/reducers/student'

const EvidenciaRegister = () => {
  const [selectedFormat, setFormat] = useState<'virtual' | 'physical'>()
  const [docLink, setDocLink] = useState<string>()
  const [isLoading, { on: loadingOn, off: loadingOff }] = useBoolean(false)

  const dispatch = useAppDispatch()

  const toast = useToast()

  const updateLink = useCallback((value: string) => {
    try {
      new URL(value)
    } catch (ignore) {
      return
    }
    setDocLink(value)
  }, [])

  const submitDoc = useCallback(async () => {
    loadingOn()
    const resp = await axios.patch('/api/documents', {
      type: selectedFormat,
      url: docLink,
    })

    if (resp.status !== 201) {
      toast.closeAll()
      toast({
        title: `Error de registro`,
        description: `Ocurrió un error al registrar tu apoyo visual, por favor intenta de nuevo.`,
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
      loadingOff()
      return
    }

    const {
      data: { data: student },
    } = resp
    dispatch(setStudent(student))
    loadingOff()
  }, [dispatch, docLink, loadingOff, loadingOn, selectedFormat, toast])

  return (
    <>
      <FormControl>
        <FormLabel mb={5}>
          La fecha límite para el registro es el 17 de abril a las 23:59 hrs,
          una vez hecho no podrás cambiarlo.
        </FormLabel>

        <Box
          mb={10}
          px={10}
          py={4}
          w="100%"
          bg="brandGrey.100"
          borderRadius="20px"
        >
          <Text textAlign="center" fontWeight={600} color="brand.900">
            {`💡 Recuerda mencionar a tu mentor si utilizarás montajes o softwares especiales en tu presentación.`}
          </Text>
        </Box>

        <RadioGroup
          mb={5}
          value={selectedFormat}
          onChange={value => setFormat(value as 'virtual' | 'physical')}
          colorScheme="brandSecondary"
        >
          <VStack spacing={10} align="flex-start" justifyContent="center">
            <HStack spacing={10} align="flex-start">
              <Radio value="virtual">Apoyo visual digital</Radio>

              {selectedFormat === 'virtual' && (
                <Box
                  w={96}
                  px={10}
                  pt={4}
                  pb={5}
                  alignSelf="center"
                  justifySelf="center"
                  borderRadius="20px"
                  bg="momentumBlacky"
                >
                  <Text color="brandGrey.50" fontSize="0.75rem">
                    Link
                  </Text>

                  <Input
                    onChange={e => updateLink(e.target.value)}
                    _focus={{ bg: 'brandGrey.50' }}
                    _active={{ bg: 'brandGrey.50' }}
                    _selected={{ bg: 'brandGrey.50' }}
                    color="momentumBlack"
                    type="url"
                    size="sm"
                    variant="filled"
                    bg="brandGrey.50"
                  />
                </Box>
              )}
            </HStack>

            <Radio value="physical">Apoyo visual físico u otro</Radio>
          </VStack>
        </RadioGroup>

        {(selectedFormat === 'physical' || docLink) && (
          <Button
            onClick={() => submitDoc()}
            h={8}
            w={32}
            isLoading={isLoading}
            colorScheme="brandSecondary"
          >
            Registrar
          </Button>
        )}
      </FormControl>
    </>
  )
}

export default EvidenciaRegister
