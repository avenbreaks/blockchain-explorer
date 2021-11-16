import React from "react";
import useSWR from "swr";
import { gql } from "graphql-request";
import { isEmpty } from "ramda";

const query = gql`
  query GetBlocks($time: Float) {
    getBlocks(time: $time) {
      hash
      height
      time
    }
  }
`;
const fallbackData = {
  getBlocks: [],
};

type props = {
  time: number;
  onError: (err: Error) => void;
};

function useBlocks(props: props) {
  const { time, onError } = props;
  const variabes = React.useMemo(() => {
    return {
      time,
    };
  }, [time]);
  const { data, error, isValidating } = useSWR(
    Number.isNaN(time) ? null : [query, variabes],
    {
      fallbackData,
      onError,
    }
  );
  return {
    blocks: data?.getBlocks || fallbackData.getBlocks,
    isLoading: !error && isEmpty(data?.getBlocks),
    isError: error,
    isValidating,
  };
}

export default useBlocks;
