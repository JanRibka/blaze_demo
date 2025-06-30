import { forwardRef, memo } from "react";

import PasswordInput from "@/components/passwordInput/PasswordInput";

interface PasswordFieldProps {
  value?: string;
  name: string;
  label: string;
  error: string;
  autoComplete: string;
  onChange: () => void;
}

export const PasswordField = memo(
  forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ value, name, label, error, autoComplete, onChange }, ref) => {
      return (
        <PasswordInput
          ref={ref}
          value={value}
          name={name}
          label={label}
          required
          isInvalid={!!error}
          errorMessage={error}
          autoComplete={autoComplete}
          variant="faded"
          color="primary"
          onChange={onChange}
        />
      );
    }
  )
);

PasswordField.displayName = "PasswordField";
