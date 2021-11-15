import React from "react";
import { useTable, usePagination } from "react-table";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/table";
import { Select } from "@chakra-ui/select";
import { map } from "ramda";
import { IconButton } from "@chakra-ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import { Flex, Text } from "@chakra-ui/layout";

const PAGE_SIZES = [10, 20, 30, 40, 50];

type props = {
  size?: "sm" | "md" | "lg";
  columns: any;
  data: any;
};

function Table(props: props) {
  const { size = "sm", columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <React.Fragment>
      <ChakraTable size={size} mb="2" {...getTableProps()}>
        <Thead>
          {map(
            (group) => (
              <Tr
                {...group.getHeaderGroupProps()}
                key={group.getHeaderGroupProps().key}
              >
                {map(
                  (column) => (
                    <Th
                      {...column.getHeaderProps()}
                      key={column.getHeaderProps().key}
                    >
                      {column.render("Header")}
                    </Th>
                  ),
                  group.headers
                )}
              </Tr>
            ),
            headerGroups
          )}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.getRowProps().key}>
                {map((cell) => {
                  return (
                    <Td {...cell.getCellProps()} key={cell.getCellProps().key}>
                      {cell.render("Cell")}
                    </Td>
                  );
                }, row.cells)}
              </Tr>
            );
          }, page)}
        </Tbody>
      </ChakraTable>
      <Flex alignItems="center" justifyContent="flex-end">
        <Select
          mr="2"
          width="auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {map(
            (pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ),
            PAGE_SIZES
          )}
        </Select>
        <Text mr="2">
          {pageIndex + 1} of {pageOptions.length}
        </Text>
        <IconButton
          mr="1"
          size="sm"
          aria-label="firstPage"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          icon={<ChevronsLeft size={20} />}
        />
        <IconButton
          mr="1"
          size="sm"
          aria-label="previousPage"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          icon={<ChevronLeft size={20} />}
        />
        <IconButton
          mr="1"
          size="sm"
          aria-label="nextPage"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          icon={<ChevronRight size={20} />}
        />
        <IconButton
          size="sm"
          aria-label="lastPage"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          icon={<ChevronsRight size={20} />}
        />
      </Flex>
    </React.Fragment>
  );
}

export default Table;
