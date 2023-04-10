import { useEffect } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'

import { wrapper } from '@/redux/store'
import theme from '@/theme'
import { Layout } from '@/widgets'

import '@fontsource/alata'
import '@fontsource/albert-sans'
import 'nprogress/nprogress.css'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps)
  const { events } = useRouter()

  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteEnd = () => NProgress.done()

    events.on('routeChangeStart', handleRouteStart)
    events.on('routeChangeComplete', handleRouteEnd)
    events.on('routeChangeError', handleRouteEnd)

    return () => {
      events.off('routeChangeStart', handleRouteStart)
      events.off('routeChangeComplete', handleRouteEnd)
      events.off('routeChangeError', handleRouteEnd)
    }
  }, [events])

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </SessionProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default App
