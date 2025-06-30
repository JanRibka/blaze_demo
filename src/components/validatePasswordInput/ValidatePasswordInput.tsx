"use client";

import { Input } from "@heroui/react";

import { PasswordToggleButton } from "./components/PasswordToggleButton";
import { usePasswordValidation } from "./hooks/usePasswordValidation";
import { usePasswordVisibility } from "./hooks/usePasswordVisibility";
import { ValidatePasswordInputProps } from "./types";

export default function ValidatePasswordInput<T extends object>({
  value,
  error,
  name,
  onChange,
  validationSchema,
  ...restProps
}: ValidatePasswordInputProps<T>) {
  const { isVisible, toggleVisibility } = usePasswordVisibility();

  const { localValue, localErrorMessage, handleChange } = usePasswordValidation(
    {
      value,
      name,
      validationSchema,
      error,
      onChange,
    }
  );

  return (
    <Input
      value={localValue}
      name={name}
      isInvalid={!!localErrorMessage}
      errorMessage={localErrorMessage}
      type={isVisible ? "text" : "password"}
      onChange={handleChange}
      endContent={
        <PasswordToggleButton
          isVisible={isVisible}
          onToggle={toggleVisibility}
        />
      }
      {...restProps}
    />
  );
}
