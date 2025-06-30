"use client";

import { useActionState, useCallback, useEffect, useState } from "react";

import { logInAction } from "@/actions/auth";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { TLogInFormError } from "@/lib/validations/schemas/logInValidationSchema";
import { validateLogInForm } from "@/lib/validations/validations/validateLogInForm";

import { UseLoginFormReturn } from "../types";

export const useLoginForm = (): UseLoginFormReturn => {
  const isFirstRender = useIsFirstRender();
  const [state, action, isLoading] = useActionState(logInAction, {
    generalState: "undefined",
  });
  const [error, setError] = useState<TLogInFormError>({});

  useEffect(() => {
    if (isFirstRender || !state.error) return;
    setError(state.error);
  }, [isFirstRender, state.error]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
      const validationResult = validateLogInForm(data);

      if (!validationResult.success) {
        event.preventDefault();
        setError({
          ...validationResult.error,
          timestamp: new Date().getTime().toString(),
        });
      }
    },
    []
  );

  const handleChange = useCallback(() => {
    if (error.general) {
      setError((prev) => ({
        ...prev,
        general: "",
      }));
    }
  }, [error.general]);

  const clearError = useCallback((field: keyof TLogInFormError) => {
    setError((prev) => ({
      ...prev,
      [field]: "",
    }));
  }, []);

  return {
    state,
    action,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    clearError,
  };
};
