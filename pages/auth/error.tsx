import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { Box, Button, Center, Img, Text, VStack } from '@chakra-ui/react'

const AuthErrorPage = () => {
  const { replace } = useRouter()
  const goToLogin = useCallback(async () => {
    await replace('/')
  }, [replace])

  return (
    <Center h="100vh">
      <Box
        pb={7}
        px={[2.5, 5, 10]}
        w={['100%', 'container.sm']}
        maxW="container.sm"
        borderRadius="5px"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        bg="brandGrey.200"
      >
        <Center>
          <VStack spacing={2.5}>
            <Box w={60}>
              <Img src="/images/woops.png" />
            </Box>

            <Text
              textAlign="justify"
              color="white"
              fontSize={['sm', 'md', 'lg']}
            >
              No pudimos completar tu inicio de sesión, asegúrate de usar tu
              correo institucional y que seas un candidato a graduar.
            </Text>

            <Button colorScheme="brand" onClick={() => goToLogin()}>
              Regresar al inicio
            </Button>
          </VStack>
        </Center>
      </Box>
    </Center>
  )
}

export default AuthErrorPage
