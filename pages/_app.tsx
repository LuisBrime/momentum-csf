import { ChakraProvider } from '@chakra-ui/react'
import {
  connectAuthEmulator,
  initializeAuth,
  indexedDBLocalPersistence,
  inMemoryPersistence,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import type { AppProps } from 'next/app'
import { AuthProvider, FirebaseAppProvider } from 'reactfire'

import configuration from '@/lib/auth/config'
import { isBrowser } from '@/lib/utils'
import theme from '@/theme'
import { Layout } from '@/widgets'

import '@fontsource/quattrocento'
import '@fontsource/quattrocento-sans'

export default function App({ Component, pageProps }: AppProps) {
  const { emulator, ...baseConfig } = configuration
  const fbApp = initializeApp(baseConfig)
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence
  const auth = initializeAuth(fbApp, { persistence })

  if (emulator.activeEmulator && !('emulator' in auth.config)) {
    connectAuthEmulator(auth, emulator.emulatorHost)
  }

  return (
    <ChakraProvider theme={theme}>
      <FirebaseAppProvider firebaseApp={fbApp}>
        <AuthProvider sdk={auth}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </FirebaseAppProvider>
    </ChakraProvider>
  )
}
