import { ValidationError } from "yup";

import TValidationResult from "@/lib/types/TValidationResult";

import logInFormValidationSchema, {
  TLogInFormError,
} from "../schemas/logInValidationSchema";

type ErrorType = Omit<TLogInFormError, "timestamp" | "general">;

export const validateLogInForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: TValidationResult<ErrorType> = { success: true, error: {} };

  try {
    logInFormValidationSchema.validateSync(formData, {
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

export const validateLogInFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: TValidationResult<ErrorType> = { success: true, error: {} };

  try {
    await logInFormValidationSchema.validate(formData, {
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
