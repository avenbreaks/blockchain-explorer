const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "http://localhost:3000/api/graphql";
const BLOCKCHAIN_ENDPOINT = "https://blockchain.info";
const SENTRY_DNS =
  "https://ac5e8e8ae1c24484b4838c456d3a48c3@o489843.ingest.sentry.io/6065534";
const IS_PROD = process.env.NODE_ENV === "production";
const EXPORTS = {
  GRAPHQL_ENDPOINT,
  BLOCKCHAIN_ENDPOINT,
  SENTRY_DNS,
  IS_PROD,
};

export default EXPORTS;
