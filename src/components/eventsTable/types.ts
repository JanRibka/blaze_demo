import { EventDTO } from "@/lib/dTOs/EventDTO";
import { SortDescriptor } from "@heroui/react";

export interface EventModalHandlers {
  onEditEvent: (event: EventDTO) => void;
  onDeleteEvent: (event: EventDTO) => void;
}

export interface EventModalsState {
  insertEvent: {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
  };
  editEvent: {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
  };
  deleteEvent: {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
  };
}

export interface EventsTableContentProps {
  data: {
    items: EventDTO[];
    totalCount: number;
  };
  pages: number;
  isLoading: boolean;
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  handlers: EventModalHandlers;
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
}
