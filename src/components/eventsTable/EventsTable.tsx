"use client";

import { useState } from "react";

import { EventDTO } from "@/lib/dTOs/EventDTO";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";

import Spinner from "../spinner/Spinner";
import EventsBottomContent from "./components/EventsBottomContent";
import EventsTopContent from "./components/EventsTopContent";
import eventsColumns from "./eventsColumns";
import { useEventsTableContext } from "./EventsTableContext";
import useEventsTable from "./hooks/useEventsTable";
import DeleteEventModal from "./modals/deleteEventModal/DeleteEventModal";
import EditEventModal from "./modals/editEventModal/EditEventModal";
import InsertEventModal from "./modals/InsertEventModal/InsertEventModal";
import { renderEventTableCell } from "./renderEventsTableCell";

export default function EventsTable() {
  // Context
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useEventsTableContext();

  const { data, pages, isLoading, refetch } = useEventsTable(
    page,
    pageSize,
    sortDescriptor
  );

  const [eventToEdit, setEventToEdit] = useState<EventDTO | null>(null);

  const {
    isOpen: isOpenInsertEvent,
    onOpen: onOpenInsertEvent,
    onOpenChange: onOpenChangeInsertEvent,
  } = useDisclosure();
  const {
    isOpen: isOpenEditEvent,
    onOpen: onOpenEditEvent,
    onOpenChange: onOpenChangeEditEvent,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteEvent,
    onOpen: onOpenDeleteEvent,
    onOpenChange: onOpenChangeDeleteEvent,
  } = useDisclosure();

  const handleEditEvent = (event: EventDTO) => {
    setEventToEdit(event);
    onOpenEditEvent();
  };

  const handleDeleteEvent = (event: EventDTO) => {
    setEventToEdit(event);
    onOpenDeleteEvent();
  };

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Události"
        topContent={<EventsTopContent onPressInsertEvent={onOpenInsertEvent} />}
        topContentPlacement="outside"
        bottomContent={
          <EventsBottomContent pages={pages} totalEvents={data.totalCount} />
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
                    handleEditEvent,
                    handleDeleteEvent
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <InsertEventModal
        isOpen={isOpenInsertEvent}
        onOpenChange={onOpenChangeInsertEvent}
        handleSuccess={refetch}
      />

      <EditEventModal
        event={eventToEdit!}
        isOpen={isOpenEditEvent}
        onOpenChange={onOpenChangeEditEvent}
        handleSuccess={refetch}
      />

      <DeleteEventModal
        event={eventToEdit!}
        isOpen={isOpenDeleteEvent}
        onOpenChange={onOpenChangeDeleteEvent}
        handleSuccess={refetch}
      />
    </div>
  );
}
