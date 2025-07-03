import { useCallback, useRef, useTransition } from "react";

import { insertEventAction } from "@/actions/events";
import { ActionResponse } from "@/lib/types/error";

import { handleActionResponse } from "../../../../../lib/utils/actionResponse";
import useInsertEventValidation from "./useInsertEventValidation";

interface UseInsertEventModalProps {
  onSuccess: () => void;
  onOpenChange: () => void;
}

export const useInsertEventModal = ({
  onSuccess,
  onOpenChange,
}: UseInsertEventModalProps) => {
  const { error, setError, validate } = useInsertEventValidation();
  const suppressOnChangeOnError = useRef<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmitInsertEvent = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      validate(event);
    },
    [validate]
  );

  const handleCloseInsertEvent = useCallback(() => {
    setError({});
    onOpenChange();
  }, [setError, onOpenChange]);

  const handleInsertEventAction = useCallback(
    async (formData: FormData) => {
      startTransition(async () => {
        suppressOnChangeOnError.current = true;

        try {
          const response = (await insertEventAction(
            formData
          )) as ActionResponse;

          const success = handleActionResponse(
            response,
            onSuccess,
            setError,
            onOpenChange,
            "Událost byla úspěšně vytvořena"
          );

          // Reset suppress flag regardless of success/failure
          suppressOnChangeOnError.current = false;

          if (!success) {
            // Error already handled by handleActionResponse
            return;
          }
        } catch (error) {
          console.error("Unexpected error during event insertion:", error);
          suppressOnChangeOnError.current = false;
        }
      });
    },
    [startTransition, onSuccess, setError, onOpenChange]
  );

  return {
    error,
    isPending,
    suppressOnChangeOnError: suppressOnChangeOnError.current,
    handleSubmitInsertEvent,
    handleCloseInsertEvent,
    handleInsertEventAction,
  };
};
