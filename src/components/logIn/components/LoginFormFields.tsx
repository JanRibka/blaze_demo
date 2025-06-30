"use client";

import { useEffect, useRef } from "react";

import ValidateInput from "@/components/validateInput/ValidateInput";
import ValidatePasswordInput from "@/components/validatePasswordInput/ValidatePasswordInput";
import { nameof } from "@/lib/utils/nameof";
import logInFormValidationSchema, {
  TLogInForm,
} from "@/lib/validations/schemas/logInValidationSchema";

import type { LoginFormFieldsProps } from "../types";
export const LoginFormFields = ({ state, error }: LoginFormFieldsProps) => {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <>
      <ValidateInput
        ref={emailRef}
        value={state.form?.email}
        name={nameof<TLogInForm>("email")}
        label="Email"
        required
        error={error}
        autoComplete="username"
        fullWidth
        variant="faded"
        color="primary"
        type="email"
        validationSchema={logInFormValidationSchema}
      />

      <ValidatePasswordInput
        value={state.form?.password}
        name={nameof<TLogInForm>("password")}
        label="Heslo"
        required
        error={error}
        autoComplete="current-password"
        fullWidth
        variant="faded"
        color="primary"
        validationSchema={logInFormValidationSchema}
      />
    </>
  );
};
