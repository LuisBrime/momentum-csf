import { PropsWithChildren } from 'react'

import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Layout = ({ children }: PropsWithChildren) => {
  const {} = useRouter()

  return (
    <Box pb={10} bg="brandGrey.200" minH="100vh" w="100vw" as="main">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <meta name="theme-color" content="#10069F" />
        <meta
          name="description"
          content="Registro para Momentum, Tec Campus Santa Fe"
        />

        <meta
          property="og:description"
          content="Registro para Momentum, Tec Campus Santa Fe"
        />
        <meta property="og:title" content="Momentum Tec CSF" />

        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />

        <title>Momentum Tec CSF</title>
      </Head>

      <Container h="100%" maxW="container.lg">
        {children}
      </Container>
    </Box>
  )
}

export default Layout
