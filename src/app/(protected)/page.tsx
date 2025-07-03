import { EventsTableContextProvider } from "@/components/eventsTable/components/EventsTableContext";
import EventsTable from "@/components/eventsTable/EventsTable";

export default async function EventsPage() {
  return (
    <div className="h-full">
      <EventsTableContextProvider>
        <EventsTable />
      </EventsTableContextProvider>
    </div>
  );
}
