import { HTMLAttributes } from "react";

import { TSignUpFormError } from "@/lib/validations/schemas/signUpFormValidationSchema";

export interface ConfirmPasswordProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  error: TSignUpFormError;
  valuePassword?: string;
  valueConfirmPassword?: string;
}

export interface UseConfirmPasswordValidationProps {
  error: TSignUpFormError;
  onValidationChange?: (isValid: boolean) => void;
}

export interface UseConfirmPasswordValidationReturn {
  passwordRef: React.RefObject<HTMLInputElement | null>;
  confirmPasswordRef: React.RefObject<HTMLInputElement | null>;
  passwordError: string;
  confirmPasswordError: string;
  handleChange: () => void;
}

export interface PasswordValidationData {
  password: string;
  confirmPassword: string;
}

export interface ValidationResult {
  password?: string;
  confirmPassword?: string;
}
