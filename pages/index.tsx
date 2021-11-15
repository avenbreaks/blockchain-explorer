import React from "react";
import Head from "next/head";
import { Cell } from "react-table";
import { format } from "date-fns";
import { Center, Container, Heading } from "@chakra-ui/layout";
import Link from "next/link";
import { Spinner } from "@chakra-ui/spinner";
import { useColorMode } from "@chakra-ui/color-mode";
import { useKeyboardEvent } from "@react-hookz/web";

import Table from "../components/misc/Table";

import useBlocks from "../hooks/useBlocks";

function Home() {
  const { blocks, isLoading } = useBlocks();
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

  return (
    <div>
      <Head>
        <title>Blocks</title>
      </Head>
      <Container maxW="container.lg" paddingY="2">
        <Heading mb="2">Blocks</Heading>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Table data={blocks} columns={columns} />
        )}
      </Container>
    </div>
  );
}

export default Home;
