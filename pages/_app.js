import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import useSWR, { SWRConfig } from 'swr'
import Layout from "../layout";
import theme from "../components/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
          <Layout>
            <SWRConfig 
                value={{
                  refreshInterval: 30000,
                  revalidateOnFocus: false,
                }}
              >
              <Component {...pageProps} />
            </SWRConfig>
          </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
