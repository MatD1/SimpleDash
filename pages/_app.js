import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import useSWR, { SWRConfig } from 'swr'
import Layout from "@/layout";
import theme from "@/components/UI/theme";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>SimpleDash - Cool Dashboard</title>
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
            <Layout>
              <SWRConfig 
                  value={{
                    refreshInterval: 300000,
                    revalidateOnFocus: false,
                  }}
                >
                <Component {...pageProps} />
              </SWRConfig>
            </Layout>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
