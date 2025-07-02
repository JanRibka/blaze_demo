import { useTransition } from "react";

import { insertEventAction } from "@/actions/events";
import CancelConfirmModal from "@/components/cancelConfirmModal/CancelConfirmModal";
import { addToast } from "@heroui/react";

import InsertEventModalContent from "./InsertEventModalContent";
import useInsertEventValidation from "./useInsertEventValidation";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  handleSuccess: () => void;
};

export default function InsertEventModal({
  isOpen,
  onOpenChange,
  handleSuccess,
}: Props) {
  // Validations
  const { error, setError, validate } = useInsertEventValidation();

  // Handlers
  const handleSubmitInsertEvent = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseInsertEvent = () => {
    setError({});
    onOpenChange();
  };

  const [isPending, startTransition] = useTransition();

  const handleInsertEventAction = async (formData: FormData) => {
    startTransition(async () => {
      const response = await insertEventAction(formData);

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
          description: "Událost byla úspěšně přidána",
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
      onOpenChange={handleCloseInsertEvent}
      headerLabel="Přidat událost"
      hideFooter
      isDismissable={false}
    >
      <InsertEventModalContent
        onCancel={handleCloseInsertEvent}
        action={handleInsertEventAction}
        onSubmit={handleSubmitInsertEvent}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
