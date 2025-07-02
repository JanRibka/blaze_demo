import EventsTable from "@/components/eventsTable/EventsTable";
import { EventsTableContextProvider } from "@/components/eventsTable/EventsTableContext";

export default async function EventsPage() {
  return (
    <div>
      <EventsTableContextProvider>
        <EventsTable />
      </EventsTableContextProvider>
    </div>
  );
}
