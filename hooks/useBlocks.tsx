import useSWR from "swr";
import { gql } from "graphql-request";
import { isEmpty } from "ramda";

const query = gql`
  query GetBlocks {
    getBlocks {
      hash
      height
      time
    }
  }
`;
const fallbackData = {
  getBlocks: [],
};

function useBlocks() {
  const { data, error } = useSWR(query, { fallbackData });
  return {
    blocks: data?.getBlocks || fallbackData.getBlocks,
    isLoading: !error && isEmpty(data?.getBlocks),
    isError: error,
  };
}

export default useBlocks;
