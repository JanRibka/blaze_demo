import { useCallback, useTransition } from "react";

import { deleteEventAction } from "@/actions/events";
import { ActionResponse } from "@/lib/types/error";
import { handleActionResponse } from "@/lib/utils/actionResponse";

import { UseDeleteEventModalProps } from "../types";

export const useDeleteEventModal = ({
  event,
  onSuccess,
  onOpenChange,
}: UseDeleteEventModalProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteEventAction = useCallback(() => {
    startTransition(async () => {
      try {
        const response = (await deleteEventAction(
          event.idEvent
        )) as ActionResponse;

        handleActionResponse(
          response,
          onSuccess,
          () => {},
          onOpenChange,
          "Událost byla úspěšně smazána"
        );
      } catch (error) {
        console.error("Unexpected error during event deletion:", error);
      }
    });
  }, [startTransition, event.idEvent, onSuccess, onOpenChange]);

  const handleCloseDeleteEvent = useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  return {
    isPending,
    handleDeleteEventAction,
    handleCloseDeleteEvent,
  };
};
