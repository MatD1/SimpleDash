import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import {ChakraProvider} from '@chakra-ui/react'
import Layout from '../layout'

function MyApp({ Component, pageProps: {
  session, ...pageProps
} }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
