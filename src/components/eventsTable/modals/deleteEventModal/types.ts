import { EventDTO } from "@/lib/dTOs/EventDTO";

export interface DeleteEventModalProps {
  event: EventDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
}

export interface UseDeleteEventModalProps {
  event: EventDTO;
  onSuccess: () => void;
  onOpenChange: () => void;
}

export interface DeleteEventModalContentProps {
  event: EventDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
}
