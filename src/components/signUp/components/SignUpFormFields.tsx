"use client";

import { forwardRef } from "react";

import ConfirmPassword from "@/components/confirmPassword/ConfirmPassword";
import ValidateInput from "@/components/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import signUpFormValidationSchema, {
  TSignUpForm,
  TSignUpFormError,
} from "@/lib/validations/schemas/signUpFormValidationSchema";

import { SignUpState } from "../types";

interface SignUpFormFieldsProps {
  state: SignUpState;
  error: TSignUpFormError;
}

const SignUpFormFields = forwardRef<HTMLInputElement, SignUpFormFieldsProps>(
  ({ state, error }, ref) => {
    return (
      <>
        <ValidateInput
          ref={ref}
          value={state.form?.email}
          name={nameof<TSignUpForm>("email")}
          label="Email"
          required
          error={error}
          autoComplete="email"
          fullWidth
          variant="faded"
          color="primary"
          type="email"
          validationSchema={signUpFormValidationSchema}
        />

        <ConfirmPassword
          valuePassword={state.form?.password}
          valueConfirmPassword={state.form?.confirmPassword}
          error={error}
        />
      </>
    );
  }
);

SignUpFormFields.displayName = "SignUpFormFields";

export default SignUpFormFields;
