import request from "graphql-request";

import constants from "../lib/constants";

function fetcher(query: string, variables: {}) {
  return request(constants.GRAPHQL_ENDPOINT, query, variables);
}

export default fetcher;
