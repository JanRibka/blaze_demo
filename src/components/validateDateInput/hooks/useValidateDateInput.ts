import { useCallback, useEffect, useState } from "react";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";

import {
  UseValidateDateInputProps,
  UseValidateDateInputReturn,
} from "../types";
import { getErrorMessage, validateDateInputField } from "../utils";

import type { DateValue } from "@internationalized/date";

export const useValidateDateInput = <T extends object>({
  initialValue,
  name,
  validationSchema,
  error,
  onChange,
  suppressOnChangeOnError,
}: UseValidateDateInputProps<T>): UseValidateDateInputReturn => {
  const isFirstRender = useIsFirstRender();

  const [localValue, setLocalValue] = useState<DateValue | null>(initialValue);
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");

  const validateAndSetError = useCallback(
    (value: string) => {
      if (!name) return;

      const errorMessage = validateDateInputField(
        validationSchema,
        name,
        value
      );
      setLocalErrorMessage(errorMessage);
    },
    [validationSchema, name]
  );

  // Handle external errors
  useEffect(() => {
    if (!name) return;

    const errorMessage = getErrorMessage(error, name);
    setLocalErrorMessage(errorMessage);
  }, [error, name]);

  // Handle external value changes
  useEffect(() => {
    if (isFirstRender) return;

    setLocalValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const handleChange = useCallback(
    (value: DateValue | null) => {
      if (suppressOnChangeOnError) return;

      setLocalValue(value);
      validateAndSetError(value?.toString() ?? "");
      onChange?.(value);
    },
    [suppressOnChangeOnError, onChange, validateAndSetError]
  );

  return {
    localValue,
    localErrorMessage,
    handleChange,
    isInvalid: !!localErrorMessage,
  };
};
