import { memo } from "react";

import { EventDTO } from "@/lib/dTOs/EventDTO";

import DeleteEventModal from "../modals/deleteEventModal/DeleteEventModal";
import EditEventModal from "../modals/editEventModal/EditEventModal";
import InsertEventModal from "../modals/InsertEventModal/InsertEventModal";
import { EventModalsState } from "../types";

interface EventModalsProps {
  selectedEvent: EventDTO | null;
  modalsState: EventModalsState;
  onSuccess: () => void;
}

export const EventModals = memo(
  ({ selectedEvent, modalsState, onSuccess }: EventModalsProps) => {
    return (
      <>
        <InsertEventModal
          isOpen={modalsState.insertEvent.isOpen}
          onOpenChange={modalsState.insertEvent.onOpenChange}
          onSuccess={onSuccess}
        />

        {selectedEvent && (
          <>
            {modalsState.editEvent.isOpen && (
              <EditEventModal
                event={selectedEvent}
                isOpen={modalsState.editEvent.isOpen}
                onOpenChange={modalsState.editEvent.onOpenChange}
                onSuccess={onSuccess}
              />
            )}

            <DeleteEventModal
              event={selectedEvent}
              isOpen={modalsState.deleteEvent.isOpen}
              onOpenChange={modalsState.deleteEvent.onOpenChange}
              onSuccess={onSuccess}
            />
          </>
        )}
      </>
    );
  }
);

EventModals.displayName = "EventModals";
