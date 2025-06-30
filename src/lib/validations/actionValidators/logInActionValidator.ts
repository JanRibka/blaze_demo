import TValidationResult from "@/lib/types/TValidationResult";

import { TLogInFormError } from "../schemas/logInValidationSchema";
import { validateLogInFormAsync } from "../validations/validateLogInForm";

export default async function logInActionValidator(
  formData: FormData
): Promise<TValidationResult<TLogInFormError>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateLogInFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  };
}
