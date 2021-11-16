import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { init } from "@sentry/nextjs";
import type { AppProps } from "next/app";

import fetcher from "../utils/fetcher";
import constants from "../lib/constants";

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

init({
  dsn: constants.SENTRY_DNS,
  tracesSampleRate: 0.5,
  enabled: constants.IS_PROD,
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
