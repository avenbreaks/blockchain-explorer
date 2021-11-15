import React from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { Box, Center, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { format } from "date-fns";
import { isEmpty, isNil, and, equals } from "ramda";
import { Cell } from "react-table";
import { useToast } from "@chakra-ui/toast";
import { useDocumentTitle } from "@react-hookz/web";
import { useDisclosure } from "@chakra-ui/hooks";

import Table from "../../components/misc/Table";
import TransactionModal from "../../components/TransactionModal";
import BackButton from "../../components/BackButton";

import useBlock from "../../hooks/useBlock";
import useTransaction from "../../hooks/useTransaction";

import utils from "../../utils";

function SingleBlock() {
  const toast = useToast();
  const router = useRouter();
  const { hash } = router.query;
  const [transactionHash, setTransactionHash] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transaction, isLoading: isLoadingTransaction } = useTransaction({
    hash: transactionHash,
    onError,
  });
  const { block, isLoading: isLoadingBlock } = useBlock({
    hash: getHash(),
    onError,
  });
  const columns = React.useMemo(
    () => [
      {
        Header: "Hash",
        accessor: "hash",
        Cell: function hashCell(props: Cell) {
          return (
            <Flex alignItems="center">
              <Text
                size="sm"
                cursor="pointer"
                color="brand.nuri"
                onClick={() => setTransactionHash(props.value)}
              >
                {props.value}
              </Text>
              {and(
                isLoadingTransaction,
                equals(transactionHash, props.value)
              ) ? (
                <Spinner ml="1" size="sm" />
              ) : null}
            </Flex>
          );
        },
      },
      {
        Header: "Size",
        accessor: "size",
      },
      {
        Header: "Time",
        accessor: "time",
        Cell: function updatedAtCell(props: Cell) {
          return <>{format(props.value, "yyyy-MM-dd")}</>;
        },
      },
    ],
    [isLoadingTransaction, transactionHash]
  );

  useDocumentTitle(`Block | ${hash}`, {
    restoreOnUnmount: true,
  });

  React.useEffect(() => {
    if (!isEmpty(transaction.hash)) {
      onOpen();
    }
  }, [transaction, onOpen]);

  function getHash() {
    if (isNil(hash)) {
      return "";
    }
    if (Array.isArray(hash)) {
      return hash[0];
    }
    return hash;
  }

  function onError(err: Error) {
    toast({
      title: "Error",
      description: err.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <div>
      <BackButton />
      <Head>
        <title>Block details</title>
      </Head>
      <Container maxW="container.lg" paddingY="2">
        <Box mb="2">
          <Heading mb="2">Details</Heading>
          {isLoadingBlock ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <React.Fragment>
              <Text>Hash: {block.hash}</Text>
              <Text>Block index: {utils.formatNumber(block.block_index)}</Text>
              <Text>Size: {utils.formatNumber(block.size)}</Text>
              <Text>Previous block: {block?.prev_block}</Text>
            </React.Fragment>
          )}
        </Box>
        <Heading mb="2">Transactions</Heading>
        {isLoadingBlock ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Table data={block?.tx} columns={columns} />
        )}
      </Container>
      <TransactionModal
        isOpen={isOpen}
        transaction={transaction}
        onClose={onClose}
      />
    </div>
  );
}

export default SingleBlock;
