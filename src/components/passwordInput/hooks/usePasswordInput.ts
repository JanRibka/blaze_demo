import { useCallback, useState } from "react";

import { UsePasswordInputProps, UsePasswordInputReturn } from "../types";

export const usePasswordInput = ({
  value,
  onChange,
}: UsePasswordInputProps): UsePasswordInputReturn => {
  const [localValue, setLocalValue] = useState<string>(value ?? "");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setLocalValue(newValue);
      onChange?.(event);
    },
    [onChange]
  );

  return {
    localValue,
    handleChange,
  };
};
