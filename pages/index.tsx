import { Box, Center, Heading, Img, Text, VStack } from '@chakra-ui/react'

import { LoginButton } from '@/components'

const HomePage = () => {
  return (
    <Center h="100vh">
      <Box
        pb={7}
        px={[2.5, 5, 10]}
        borderRadius="5px"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        w={['100%', 'container.sm']}
        maxW="container.sm"
        bg="momentumBlack"
      >
        <Center>
          <VStack spacing={2.5}>
            <Box w={[32, 48, 60, 96]}>
              <Img src="images/momentum_white.png" />
            </Box>

            <Heading color="white" as="h1" size={['sm', 'md', 'lg', 'xl']}>
              Registro
            </Heading>

            <Text color="white" fontSize={['sm', 'md', 'lg']}>
              Ingresa con tu correo institucional para continuar
            </Text>

            <LoginButton />
          </VStack>
        </Center>
      </Box>
    </Center>
  )
}

export default HomePage
