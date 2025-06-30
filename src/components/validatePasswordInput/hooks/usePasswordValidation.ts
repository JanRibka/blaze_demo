import { useCallback, useEffect, useState } from "react";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { validateField } from "@/lib/validations/validations/validateField";

import { UsePasswordValidationProps } from "../types";

export const usePasswordValidation = <T extends object>({
  value,
  name,
  validationSchema,
  error,
  onChange,
}: UsePasswordValidationProps<T>) => {
  const isFirstRender = useIsFirstRender();

  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");

  // Memoized validation function
  const validateValue = useCallback(
    (inputValue: string): string => {
      if (!inputValue || !name) return "";
      return validateField<T>(validationSchema, name, inputValue);
    },
    [validationSchema, name]
  );

  // Handle external error changes
  useEffect(() => {
    if (name && typeof error[name] === "string") {
      setLocalErrorMessage(error[name]);
    }
  }, [error, name]);

  // Handle external value changes
  useEffect(() => {
    if (isFirstRender) return;
    setLocalValue(value ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setLocalValue(newValue);
      setLocalErrorMessage(validateValue(newValue));
      onChange?.(event);
    },
    [validateValue, onChange]
  );

  return {
    localValue,
    localErrorMessage,
    handleChange,
  };
};
