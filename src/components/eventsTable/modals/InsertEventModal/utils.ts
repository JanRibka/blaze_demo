import { addToast } from "@heroui/react";

import { ActionResponse, ToastOptions } from "./types";

export const showToast = (options: ToastOptions): void => {
  addToast(options);
};

export const showSuccessToast = (): void => {
  showToast({
    title: "Úspěch",
    description: "Událost byla úspěšně přidána",
    color: "success",
  });
};

export const showErrorToast = (description: string): void => {
  showToast({
    title: "Chyba",
    description,
    color: "danger",
  });
};

export const isValidationError = (
  error: unknown
): error is Record<string, string> => {
  return typeof error === "object" && error !== null && !Array.isArray(error);
};

export const handleActionResponse = (
  response: ActionResponse,
  onSuccess: () => void,
  onError: (error: Record<string, string>) => void,
  onModalClose: () => void
): boolean => {
  if (!response.success) {
    if (isValidationError(response.error)) {
      onError(response.error);
      return false;
    }

    showErrorToast(response.error as string);
    return false;
  }

  onSuccess();
  showSuccessToast();
  onModalClose();
  return true;
};
