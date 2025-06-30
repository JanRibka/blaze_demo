import { ValidationError } from "yup";

import TValidationResult from "@/lib/types/TValidationResult";

import signUpFormValidationSchema, {
  TSignUpFormError,
} from "../schemas/signUpFormValidationSchema";

type ErrorType = Omit<TSignUpFormError, "timestamp" | "general">;

export const validateSignUpForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: TValidationResult<ErrorType> = { success: true, error: {} };

  try {
    signUpFormValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};

export const validateSignUpFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: TValidationResult<ErrorType> = { success: true, error: {} };

  try {
    await signUpFormValidationSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};
