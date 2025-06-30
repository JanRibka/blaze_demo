import { useCallback, useEffect, useState } from "react";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { TSignUpFormError } from "@/lib/validations/schemas/signUpFormValidationSchema";
import { validateSignUpForm } from "@/lib/validations/validations/validateSignUpForm";

import { SignUpState, UseSignUpFormReturn } from "../types";

export const useSignUpForm = (state: SignUpState): UseSignUpFormReturn => {
  const isFirstRender = useIsFirstRender();
  const [errors, setErrors] = useState<TSignUpFormError>({});

  // Sync server errors with local state
  useEffect(() => {
    if (isFirstRender || !state.error) return;
    setErrors(state.error);
  }, [state.error, isFirstRender]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
      const validationResult = validateSignUpForm(data);

      if (!validationResult.success) {
        event.preventDefault();
        setErrors({
          ...validationResult.error,
          timestamp: new Date().getTime().toString(),
        });
      }
    },
    []
  );

  const handleChange = useCallback(() => {
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  }, [errors.general]);

  const clearGeneralError = useCallback(() => {
    setErrors((prev) => ({
      ...prev,
      general: "",
    }));
  }, []);

  return {
    errors,
    handleSubmit,
    handleChange,
    clearGeneralError,
  };
};
