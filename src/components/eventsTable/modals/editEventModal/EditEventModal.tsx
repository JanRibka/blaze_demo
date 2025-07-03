import React, { memo } from "react";

import CancelConfirmModal from "@/components/cancelConfirmModal/CancelConfirmModal";

import EditEventModalContent from "./components/EditEventModalContent";
import { useEditEventModal } from "./hooks/useEditEventModal";
import { EditEventModalProps } from "./types";

const EditEventModal: React.FC<EditEventModalProps> = memo(
  ({ event, isOpen, onOpenChange, onSuccess }) => {
    const {
      error,
      isPending,
      suppressOnChangeOnError,
      handleSubmitEditEvent,
      handleCloseEditEvent,
      handleEditEventAction,
    } = useEditEventModal({ event, onSuccess, onOpenChange });

    return (
      <CancelConfirmModal
        isOpen={isOpen}
        placement="center"
        onOpenChange={handleCloseEditEvent}
        headerLabel="Upravit událost"
        hideFooter={true}
        isDismissable={false}
      >
        <EditEventModalContent
          event={event}
          onCancel={handleCloseEditEvent}
          action={handleEditEventAction}
          onSubmit={handleSubmitEditEvent}
          errors={error}
          isPending={isPending}
          suppressOnChangeOnError={suppressOnChangeOnError}
        />
      </CancelConfirmModal>
    );
  }
);

EditEventModal.displayName = "EditEventModal";

export default EditEventModal;
