import React, { memo } from "react";

import CancelConfirmModal from "@/components/cancelConfirmModal/CancelConfirmModal";

import InsertEventModalContent from "./components/InsertEventModalContent";
import { useInsertEventModal } from "./hooks/useInsertEventModal";
import { InsertEventModalProps } from "./types";

const InsertEventModal: React.FC<InsertEventModalProps> = memo(
  ({ isOpen, onOpenChange, onSuccess }) => {
    const {
      error,
      isPending,
      suppressOnChangeOnError,
      handleSubmitInsertEvent,
      handleCloseInsertEvent,
      handleInsertEventAction,
    } = useInsertEventModal({ onSuccess, onOpenChange });

    return (
      <CancelConfirmModal
        isOpen={isOpen}
        placement="center"
        onOpenChange={handleCloseInsertEvent}
        headerLabel="Přidat událost"
        hideFooter={true}
        isDismissable={false}
      >
        <InsertEventModalContent
          onCancel={handleCloseInsertEvent}
          action={handleInsertEventAction}
          onSubmit={handleSubmitInsertEvent}
          errors={error}
          isPending={isPending}
          suppressOnChangeOnError={suppressOnChangeOnError}
        />
      </CancelConfirmModal>
    );
  }
);

InsertEventModal.displayName = "InsertEventModal";

export default InsertEventModal;
