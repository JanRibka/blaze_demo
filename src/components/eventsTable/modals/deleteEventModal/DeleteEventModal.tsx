import CancelConfirmModal from "@/components/cancelConfirmModal/CancelConfirmModal";

import DeleteEventModalContent from "./components/DeleteEventModalContent";
import { useDeleteEventModal } from "./hooks/useDeleteEventModal";
import { DeleteEventModalProps } from "./types";

export default function DeleteEventModal({
  event,
  isOpen,
  onOpenChange,
  onSuccess,
}: DeleteEventModalProps) {
  const { isPending, handleDeleteEventAction, handleCloseDeleteEvent } =
    useDeleteEventModal({ event, onSuccess, onOpenChange });

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseDeleteEvent}
      headerLabel="Smazat událost"
      hideFooter
      isDismissable={false}
    >
      <DeleteEventModalContent
        event={event}
        onCancel={handleCloseDeleteEvent}
        action={handleDeleteEventAction}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
