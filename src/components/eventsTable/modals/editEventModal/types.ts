import { EventDTO } from "@/lib/dTOs/EventDTO";

export interface EditEventModalProps {
  event: EventDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
}

export interface EditEventModalContentProps {
  event: EventDTO;
  onCancel: () => void;
  action: (formData: FormData) => Promise<void>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: Record<string, string>;
  isPending: boolean;
  suppressOnChangeOnError: boolean;
}

export interface UseEditEventModalProps {
  event: EventDTO;
  onSuccess: () => void;
  onOpenChange: () => void;
}
