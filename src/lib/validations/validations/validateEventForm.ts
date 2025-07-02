import { ValidationError } from "yup";

import TErrorGeneral from "@/lib/types/TErrorGeneral";
import TValidationResult from "@/lib/types/TValidationResult";

import eventFormValidationSchema, {
  TEventFormError,
} from "../schemas/eventFormValidationSchema";

type ErrorType = Omit<TEventFormError, TErrorGeneral>;

export const validateEventForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: TValidationResult<ErrorType> = { success: true, error: {} };

  try {
    eventFormValidationSchema.validateSync(formData, {
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

export const validateEventFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: TValidationResult<ErrorType> = { success: true, error: {} };

  try {
    await eventFormValidationSchema.validate(formData, {
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
