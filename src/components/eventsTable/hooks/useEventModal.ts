import { useState } from "react";

import { EventDTO } from "@/lib/dTOs/EventDTO";
import { useDisclosure } from "@heroui/react";

import { EventModalHandlers, EventModalsState } from "../types";

export const useEventModals = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventDTO | null>(null);

  const insertEventModal = useDisclosure();
  const editEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const handlers: EventModalHandlers = {
    onEditEvent: (event: EventDTO) => {
      setSelectedEvent(event);
      editEventModal.onOpen();
    },
    onDeleteEvent: (event: EventDTO) => {
      setSelectedEvent(event);
      deleteEventModal.onOpen();
    },
  };

  const modalsState: EventModalsState = {
    insertEvent: insertEventModal,
    editEvent: editEventModal,
    deleteEvent: deleteEventModal,
  };

  return {
    selectedEvent,
    handlers,
    modalsState,
  };
};
