import { InputProps } from "@heroui/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordInputProps
  extends Omit<InputProps, "type" | "endContent"> {}

export interface UsePasswordInputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UsePasswordInputReturn {
  localValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UsePasswordVisibilityReturn {
  isVisible: boolean;
  toggleVisibility: () => void;
}
