import { useCallback } from 'react'

import { Badge, Box, Button, Flex, Img, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

import { useAppSelector } from '@/redux/hooks'
import { selectUserType } from '@/redux/selectors'

const Navbar = () => {
  const { replace } = useRouter()

  const userType = useAppSelector(selectUserType)

  const bye = useCallback(async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    await replace(data.url)
  }, [replace])

  return (
    <Box
      px={10}
      py={5}
      w="100%"
      boxShadow="box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
    >
      <Flex align="center" justify="space-between" direction="row">
        <Box w={40} justifySelf="flex-start">
          <VStack spacing={0} alignContent="center" justify="center">
            <Img src="/images/momentum_white.png" />
            {userType !== 0 && (
              <Badge variant="subtle" colorScheme="brandSecondary">
                Admin
              </Badge>
            )}
          </VStack>
        </Box>

        <Box justifySelf="flex-end">
          <Button
            onClick={() => bye()}
            color="white"
            colorScheme="brandSecondary"
            variant="ghost"
          >
            Cerrar sesión
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
