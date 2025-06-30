"use client";

import { forwardRef } from "react";

import { Input } from "@heroui/react";

import { PasswordToggleButton } from "./components/PasswordToggleButton";
import { usePasswordInput } from "./hooks/usePasswordInput";
import { usePasswordVisibility } from "./hooks/usePasswordVisibility";
import { PasswordInputProps } from "./types";

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, onChange, ...restProps }, ref) => {
    const { localValue, handleChange } = usePasswordInput({ value, onChange });
    const { isVisible, toggleVisibility } = usePasswordVisibility();

    return (
      <Input
        ref={ref}
        value={localValue}
        {...restProps}
        type={isVisible ? "text" : "password"}
        onChange={handleChange}
        endContent={
          <PasswordToggleButton
            isVisible={isVisible}
            onToggle={toggleVisibility}
            ariaLabel="Přepnout viditelnost hesla"
          />
        }
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
