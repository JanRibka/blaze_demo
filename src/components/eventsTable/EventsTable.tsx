"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import Spinner from "../spinner/Spinner";
import EventsBottomContent from "./EventsBottomContent";
import eventsColumns from "./eventsColumns";
import { useEventsTableContext } from "./EventsTableContext";
import useEventsTable from "./hooks/useEventsTable";

export default function EventsTable() {
  // Context
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useEventsTableContext();

  const { data, pages, isLoading } = useEventsTable(
    page,
    pageSize,
    sortDescriptor
  );

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Události"
        bottomContent={
          <EventsBottomContent pages={pages} totalUsers={data.totalCount} />
        }
        bottomContentPlacement="outside"
        fullWidth
        className="h-full"
        classNames={{
          wrapper: "rounded-none shadow-none p-0 flex-1",
        }}
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
      >
        <TableHeader columns={eventsColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              allowsSorting={column.allowsSorting}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={data.items}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
          emptyContent="Žádný uživatel nebyl nalezen"
        >
          {(item) => (
            <TableRow key={item.idUser}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
