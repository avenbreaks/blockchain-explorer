import React from "react";
import useSWR from "swr";
import { gql } from "graphql-request";
import { isEmpty } from "ramda";

const query = gql`
  query GetTransaction($hash: String) {
    getTransaction(hash: $hash) {
      hash
      tx_index
      relayed_by
    }
  }
`;
const fallbackData = {
  getTransaction: { hash: "", tx_index: 0, relayed_by: "" },
};

type props = {
  hash: string;
  onError: (err: Error) => void;
};

function useTransaction(props: props) {
  const { hash, onError } = props;
  const variabes = React.useMemo(() => {
    return {
      hash,
    };
  }, [hash]);
  const { data, error } = useSWR(isEmpty(hash) ? null : [query, variabes], {
    fallbackData,
    onError,
  });
  return {
    transaction: data?.getTransaction || fallbackData.getTransaction,
    isLoading: !error && isEmpty(data?.getTransaction.hash),
    isError: error,
  };
}

export default useTransaction;
