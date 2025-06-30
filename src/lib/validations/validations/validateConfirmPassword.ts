import { ValidationError } from "yup";

import confirmPasswordValidationSchema, {
  TConfirmPasswordFormError,
} from "../schemas/confirmPasswordValidationSchema";

export const validateConfirmPassword = (
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: TConfirmPasswordFormError = {};

  try {
    confirmPasswordValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof TConfirmPasswordFormError;

      if (!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};

export const validateConfirmPasswordAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const errors: TConfirmPasswordFormError = {};

  try {
    confirmPasswordValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof TConfirmPasswordFormError;

      if (!errors[path]) {
        errors[path] = err.message;
      }
    });
  }

  return errors;
};
