import * as Yup from "yup";

import { InputProps } from "@heroui/react";

export interface ValidationError {
  [key: string]: string;
}

export interface ValidatePasswordInputProps<T extends object>
  extends Omit<
    InputProps,
    "isInvalid" | "errorMessage" | "type" | "endContent"
  > {
  validationSchema: Yup.ObjectSchema<T>;
  error: ValidationError;
}

export interface UsePasswordValidationProps<T extends object> {
  value?: string;
  name?: string;
  validationSchema: Yup.ObjectSchema<T>;
  error: ValidationError;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UsePasswordVisibilityReturn {
  isVisible: boolean;
  toggleVisibility: () => void;
}
