import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import fetcher from "../utils/fetcher";

const BRAND_COLOR = "#beaaff";
const theme = extendTheme({
  colors: {
    brand: {
      nuri: BRAND_COLOR,
    },
  },
  styles: {
    global: {
      a: {
        color: BRAND_COLOR,
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
