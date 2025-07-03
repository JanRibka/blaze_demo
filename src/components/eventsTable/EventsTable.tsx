"use client";

import { EventModals } from "./components/EventModals";
import EventsBottomContent from "./components/EventsBottomContent";
import { EventsTableContent } from "./components/EventsTableContent";
import { useEventsTableContext } from "./components/EventsTableContext";
import EventsTopContent from "./components/EventsTopContent";
import { useEventModals } from "./hooks/useEventModal";
import useEventsTable from "./hooks/useEventsTable";

export const EventsTable = () => {
  // Context
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useEventsTableContext();

  // Data fetching
  const { data, pages, isLoading, refetch } = useEventsTable(
    page,
    pageSize,
    sortDescriptor
  );

  // Modal management
  const { selectedEvent, handlers, modalsState } = useEventModals();

  // Memoized content components
  const topContent = (
    <EventsTopContent onPressInsertEvent={modalsState.insertEvent.onOpen} />
  );
  const bottomContent = (
    <EventsBottomContent pages={pages} totalEvents={data.totalCount} />
  );

  return (
    <div className="h-full">
      <EventsTableContent
        data={data}
        pages={pages}
        isLoading={isLoading}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        handlers={handlers}
        topContent={topContent}
        bottomContent={bottomContent}
      />

      <EventModals
        selectedEvent={selectedEvent}
        modalsState={modalsState}
        onSuccess={refetch}
      />
    </div>
  );
};

export default EventsTable;
