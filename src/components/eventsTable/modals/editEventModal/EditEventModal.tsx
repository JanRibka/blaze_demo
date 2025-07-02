import { useTransition } from "react";

import { updateEventAction } from "@/actions/events";
import CancelConfirmModal from "@/components/cancelConfirmModal/CancelConfirmModal";
import { EventDTO } from "@/lib/dTOs/EventDTO";
import { addToast } from "@heroui/react";

import EditEventModalContent from "./EditEventModalContent";
import useEditEventValidation from "./useEditEventValidation";

type Props = {
  event: EventDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  handleSuccess: () => void;
};

export default function EditEventModal({
  event,
  isOpen,
  onOpenChange,
  handleSuccess,
}: Props) {
  // Validations
  const { error, setError, validate } = useEditEventValidation();

  // Handlers
  const handleSubmitEditEvent = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseEditEvent = () => {
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleEditEventAction = async (formData: FormData) => {
    startTransition(async () => {
      const response = await updateEventAction(event.idEvent, formData);

      if (!response.success) {
        if (typeof response.error === "object") {
          setError(response.error);
          return;
        }

        addToast({
          title: "Chyba",
          description: response.error as string,
          color: "danger",
        });
      } else {
        handleSuccess();
        addToast({
          title: "Úspěch",
          description: "Událost byla úspěšně upravena",
          color: "success",
        });
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseEditEvent}
      headerLabel="Upravit událost"
      hideFooter
      isDismissable={false}
    >
      <EditEventModalContent
        event={event}
        onCancel={handleCloseEditEvent}
        action={handleEditEventAction}
        onSubmit={handleSubmitEditEvent}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
