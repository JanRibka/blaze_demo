import Spinner from "@/components/spinner/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import eventsColumns from "../eventsColumns";
import { renderEventTableCell } from "../renderEventsTableCell";
import { EventsTableContentProps } from "../types";

export const EventsTableContent = ({
  data,
  isLoading,
  sortDescriptor,
  onSortChange,
  handlers,
  topContent,
  bottomContent,
}: EventsTableContentProps) => {
  return (
    <Table
      suppressContentEditableWarning
      isHeaderSticky
      aria-label="Události"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      fullWidth
      className="h-full"
      classNames={{
        wrapper: "rounded-none shadow-none p-0 flex-1",
      }}
      onSortChange={onSortChange}
      sortDescriptor={sortDescriptor}
    >
      <TableHeader columns={eventsColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.align}
            allowsSorting={column.allowsSorting}
            width={column.width}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data.items}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
        emptyContent="Žádná událost nebyla nalezena"
      >
        {(item) => (
          <TableRow key={item.idEvent}>
            {(columnKey) => (
              <TableCell>
                {renderEventTableCell(
                  item,
                  columnKey,
                  handlers.onEditEvent,
                  handlers.onDeleteEvent
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
