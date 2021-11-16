import React from "react";
import Head from "next/head";
import { Cell } from "react-table";
import { format } from "date-fns";
import { Center, Container, Heading, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { Spinner } from "@chakra-ui/spinner";
import { useColorMode } from "@chakra-ui/color-mode";
import { useKeyboardEvent } from "@react-hookz/web";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { isEmpty } from "ramda";

import Table from "../components/misc/Table";

import useBlocks from "../hooks/useBlocks";

const INITIAL_DATE = format(new Date(), "yyyy-MM-dd").toString();

function Home() {
  const toast = useToast();
  const [date, setDate] = React.useState(INITIAL_DATE);
  const { blocks, isValidating } = useBlocks({
    time: Date.parse(date),
    onError,
  });
  const { setColorMode } = useColorMode();
  const columns = React.useMemo(
    () => [
      {
        Header: "Hash",
        accessor: "hash",
        Cell: function hashCell(props: Cell) {
          const { value } = props;
          return (
            <Link href={`/blocks/${value}`} passHref>
              {value}
            </Link>
          );
        },
      },
      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Time",
        accessor: "time",
        Cell: function updatedAtCell(props: Cell) {
          return <>{format(props.value, "yyyy-MM-dd")}</>;
        },
      },
    ],
    []
  );

  useKeyboardEvent("d", () => setColorMode("dark"), [], { event: "keyup" });
  useKeyboardEvent("l", () => setColorMode("light"), [], { event: "keyup" });

  function onError(err: Error) {
    toast({
      title: "Error",
      description: err.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  function renderTable() {
    if (isValidating) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    if (isEmpty(date)) {
      return (
        <Center>
          <Text>Please select a date.</Text>
        </Center>
      );
    }
    if (isEmpty(blocks)) {
      return (
        <Center>
          <Text>No blocks for selected date.</Text>
        </Center>
      );
    }
    return <Table data={blocks} columns={columns} />;
  }

  return (
    <div>
      <Head>
        <title>Blocks</title>
      </Head>
      <Container maxW="container.lg" paddingY="2">
        <Heading mb="2">Blocks</Heading>
        <Input
          mb="2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
        {renderTable()}
      </Container>
    </div>
  );
}

export default Home;
