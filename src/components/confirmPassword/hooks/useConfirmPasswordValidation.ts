import { useCallback, useEffect, useRef, useState } from "react";

import { validateConfirmPassword } from "@/lib/validations/validations/validateConfirmPassword";

import {
  UseConfirmPasswordValidationProps,
  UseConfirmPasswordValidationReturn,
  ValidationResult,
} from "../types";

export const useConfirmPasswordValidation = ({
  error,
  onValidationChange,
}: UseConfirmPasswordValidationProps): UseConfirmPasswordValidationReturn => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // Memoized validation function
  const validatePasswords = useCallback((): ValidationResult => {
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    const data = {
      password,
      confirmPassword,
    };

    return validateConfirmPassword(data);
  }, []);

  // Update error messages based on validation
  const updateErrorMessages = useCallback(
    (validationResult: ValidationResult) => {
      const password = passwordRef.current?.value || "";
      const confirmPassword = confirmPasswordRef.current?.value || "";

      // Handle password error
      if (!password || !validationResult?.password) {
        setPasswordError("");
      } else if (typeof validationResult.password === "string") {
        setPasswordError(validationResult.password);
      }

      // Handle confirm password error
      if (!confirmPassword || !validationResult?.confirmPassword) {
        setConfirmPasswordError("");
      } else if (typeof validationResult.confirmPassword === "string") {
        setConfirmPasswordError(validationResult.confirmPassword);
      }

      // Notify parent about validation state
      const isValid =
        !validationResult?.password && !validationResult?.confirmPassword;
      onValidationChange?.(isValid);
    },
    [onValidationChange]
  );

  // Handle external errors
  useEffect(() => {
    if (typeof error?.password === "string") {
      setPasswordError(error.password);
    }
    if (typeof error?.confirmPassword === "string") {
      setConfirmPasswordError(error.confirmPassword);
    }
  }, [error]);

  const handleChange = useCallback(() => {
    const validationResult = validatePasswords();
    updateErrorMessages(validationResult);
  }, [validatePasswords, updateErrorMessages]);

  return {
    passwordRef,
    confirmPasswordRef,
    passwordError,
    confirmPasswordError,
    handleChange,
  };
};
