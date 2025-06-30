import TValidationResult from "@/lib/types/TValidationResult";

import { TSignUpFormError } from "../schemas/signUpFormValidationSchema";
import { validateSignUpFormAsync } from "../validations/validateSignUpForm";

export default async function signUpActionValidator(
  formData: FormData
): Promise<TValidationResult<TSignUpFormError>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateSignUpFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  };
}
