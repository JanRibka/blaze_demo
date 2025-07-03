import { useCallback, useRef, useTransition } from "react";

import { updateEventAction } from "@/actions/events";
import { ActionResponse } from "@/lib/types/error";
import { handleActionResponse } from "@/lib/utils/actionResponse";

import { UseEditEventModalProps } from "../types";
import useEditEventValidation from "./useEditEventValidation";

export const useEditEventModal = ({
  event,
  onSuccess,
  onOpenChange,
}: UseEditEventModalProps) => {
  const { error, setError, validate } = useEditEventValidation();
  const suppressOnChangeOnError = useRef<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmitEditEvent = useCallback(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      validate(formEvent);
    },
    [validate]
  );

  const handleCloseEditEvent = useCallback(() => {
    setError({});
    onOpenChange();
  }, [setError, onOpenChange]);

  const handleEditEventAction = useCallback(
    async (formData: FormData) => {
      startTransition(async () => {
        suppressOnChangeOnError.current = true;

        try {
          const response = (await updateEventAction(
            event.idEvent,
            formData
          )) as ActionResponse;

          const success = handleActionResponse(
            response,
            onSuccess,
            setError,
            onOpenChange,
            "Událost byla úspěšně upravena"
          );

          // Reset suppress flag regardless of success/failure
          suppressOnChangeOnError.current = false;

          if (!success) {
            // Error already handled by handleActionResponse
            return;
          }
        } catch (error) {
          console.error("Unexpected error during event update:", error);
          suppressOnChangeOnError.current = false;
        }
      });
    },
    [startTransition, event.idEvent, onSuccess, setError, onOpenChange]
  );

  return {
    error,
    isPending,
    suppressOnChangeOnError: suppressOnChangeOnError.current,
    handleSubmitEditEvent,
    handleCloseEditEvent,
    handleEditEventAction,
  };
};
