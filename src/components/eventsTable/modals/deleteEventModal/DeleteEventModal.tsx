import { useTransition } from "react";

import { deleteEventAction } from "@/actions/events";
import CancelConfirmModal from "@/components/cancelConfirmModal/CancelConfirmModal";
import { EventDTO } from "@/lib/dTOs/EventDTO";
import { addToast } from "@heroui/react";

import DeleteEventModalContent from "./DeleteEventModalContent";

type Props = {
  event: EventDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  handleSuccess: () => void;
};

export default function DeleteUnitGroupModal({
  event,
  isOpen,
  onOpenChange,
  handleSuccess,
}: Props) {
  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleDeleteUnitGroupAction = async () => {
    startTransition(async () => {
      const response = await deleteEventAction(event.idEvent);

      if (!response.success) {
        addToast({
          title: "Chyba",
          description: response.error as string,
          color: "danger",
        });
      } else {
        handleSuccess();
        addToast({
          title: "Úspěch",
          description: "Událost byla úspěšně smazána",
          color: "success",
        });
        onOpenChange();
      }
    });
  };

  // Handlers
  const handleCloseDeleteGroup = () => {
    onOpenChange();
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseDeleteGroup}
      headerLabel="Smazat událost"
      hideFooter
      isDismissable={false}
    >
      <DeleteEventModalContent
        event={event}
        onCancel={handleCloseDeleteGroup}
        action={handleDeleteUnitGroupAction}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
