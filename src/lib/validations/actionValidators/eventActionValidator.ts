import TValidationResult from "@/lib/types/TValidationResult";

import { TEventFormError } from "../schemas/eventFormValidationSchema";
import { validateEventFormAsync } from "../validations/validateEventForm";

export default async function eventActionValidator(
  formData: FormData
): Promise<TValidationResult<TEventFormError>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateEventFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  };
}
