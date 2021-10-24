import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, defaultOptions} from "react-query";
import Layout from "../layout";
import theme from "../theme";

const queryClient = new QueryClient({

  defaultOptions: {

    queries: {

      queryFn: {
        refetchInterval: 1000
      },

    },

  },

})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
        ,
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
