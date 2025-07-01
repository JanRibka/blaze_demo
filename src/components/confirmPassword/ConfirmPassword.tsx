import { nameof } from "@/lib/utils/nameof";
import { cn } from "@/lib/utils/styles";
import { TSignUpForm } from "@/lib/validations/schemas/signUpFormValidationSchema";

import PasswordInput from "../passwordInput/PasswordInput";
import { useConfirmPasswordValidation } from "./hooks/useConfirmPasswordValidation";
import { ConfirmPasswordProps } from "./types";

export default function ConfirmPassword({
  valuePassword,
  valueConfirmPassword,
  className,
  error,
  ...restProps
}: ConfirmPasswordProps) {
  const {
    passwordRef,
    confirmPasswordRef,
    passwordError,
    confirmPasswordError,
    handleChange,
  } = useConfirmPasswordValidation({
    error,
  });

  return (
    <div className={cn("space-y-5", className)} {...restProps}>
      <PasswordInput
        ref={passwordRef}
        value={valuePassword}
        name={nameof<TSignUpForm>("password")}
        label="Heslo"
        required
        isInvalid={!!passwordError}
        errorMessage={passwordError}
        autoComplete="current-password"
        variant="faded"
        color="primary"
        onChange={handleChange}
      />
      <PasswordInput
        ref={confirmPasswordRef}
        value={valueConfirmPassword}
        name={nameof<TSignUpForm>("confirmPassword")}
        label="Potvrdit heslo"
        required
        isInvalid={!!confirmPasswordError}
        errorMessage={confirmPasswordError}
        autoComplete="new-password"
        variant="faded"
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
