import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { nameof } from "@/lib/utils/nameof";
import { mergeStyles } from "@/lib/utils/styles";
import {
  TSignUpForm,
  TSignUpFormError,
} from "@/lib/validations/schemas/signUpFormValidationSchema";
import { validateConfirmPassword } from "@/lib/validations/validations/validateConfirmPassword";

import PasswordInput from "../passwordInput/PasswordInput";

type Props = HTMLAttributes<
  Omit<HTMLDivElement, "children" | "isInvalid" | "errorMessage">
> & {
  error: TSignUpFormError;
  valuePassword?: string;
  valueConfirmPassword?: string;
};

export default function ConfirmPassword({
  valuePassword,
  valueConfirmPassword,
  className,
  error,
  ...restProps
}: Props) {
  const refPassword = useRef<HTMLInputElement>(null);
  const refConfirmPassword = useRef<HTMLInputElement>(null);

  const [localPasswordErrorMessage, setLocalPasswordErrorMessage] =
    useState<string>("");
  const [
    localConfirmPasswordErrorMessage,
    setLocalConfirmPasswordErrorMessage,
  ] = useState<string>("");

  const setErrorMessage = () => {
    const password = refPassword.current?.value || "";
    const confirmPassword = refConfirmPassword.current?.value || "";

    const data = {
      password,
      confirmPassword,
    };

    const validationResult = validateConfirmPassword(data);

    if (!password || !validationResult?.password) {
      setLocalPasswordErrorMessage("");
    } else if (typeof validationResult?.password === "string") {
      setLocalPasswordErrorMessage(validationResult.password);
    }
    if (!confirmPassword || !validationResult?.confirmPassword) {
      setLocalConfirmPasswordErrorMessage("");
    } else if (typeof validationResult?.confirmPassword === "string") {
      setLocalConfirmPasswordErrorMessage(validationResult.confirmPassword);
    }
  };

  useEffect(() => {
    if (typeof error?.password === "string") {
      setLocalPasswordErrorMessage(error.password);
    }
    if (typeof error?.confirmPassword === "string") {
      setLocalConfirmPasswordErrorMessage(error?.confirmPassword);
    }
  }, [error]);

  const handleChange = () => {
    setErrorMessage();
  };

  return (
    <div className={mergeStyles("space-y-5", className)} {...restProps}>
      <PasswordInput
        ref={refPassword}
        value={valuePassword}
        name={nameof<TSignUpForm>("password")}
        label="Heslo"
        required
        isInvalid={!!localPasswordErrorMessage}
        errorMessage={localPasswordErrorMessage}
        autoComplete="current-password"
        variant="faded"
        color="primary"
        onChange={handleChange}
      />
      <PasswordInput
        ref={refConfirmPassword}
        value={valueConfirmPassword}
        name={nameof<TSignUpForm>("confirmPassword")}
        label="Potvrdit heslo"
        required
        isInvalid={!!localConfirmPasswordErrorMessage}
        errorMessage={localConfirmPasswordErrorMessage}
        autoComplete="new-password"
        variant="faded"
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
