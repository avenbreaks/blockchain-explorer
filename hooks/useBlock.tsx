import React from "react";
import useSWR from "swr";
import { gql } from "graphql-request";
import { isEmpty } from "ramda";

const query = gql`
  query GetBlock($hash: String) {
    getBlock(hash: $hash) {
      hash
      prev_block
      block_index
      size
      tx {
        hash
        size
        time
      }
    }
  }
`;
const fallbackData = {
  getBlock: { hash: "", prev_block: "", size: 0, block_index: 0, tx: [] },
};

type props = {
  hash: string;
  onError: (err: Error) => void;
};

function useBlock(props: props) {
  const { hash, onError } = props;
  const variabes = React.useMemo(() => {
    return {
      hash,
    };
  }, [hash]);
  const { data, error } = useSWR([query, variabes], {
    fallbackData,
    onError,
  });
  return {
    block: data?.getBlock || fallbackData.getBlock,
    isLoading: !error && isEmpty(data?.getBlock.hash),
    isError: error,
  };
}

export default useBlock;
