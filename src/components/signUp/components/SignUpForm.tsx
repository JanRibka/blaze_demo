"use client";

import { useEffect, useRef } from "react";

import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import FormAlert from "@/components/form/FormAlert";
import FormHeading from "@/components/form/FormHeading";

import { SignUpFormProps } from "../types";
import SignUpFormFields from "./SignUpFormFields";

export default function SignUpForm({
  state,
  error,
  isLoading,
  action,
  onSubmit,
  onChange,
}: SignUpFormProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <FormHeading className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Registrace
        </FormHeading>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Vytvořte si nový účet
        </p>
      </div>

      <FormAlert className="mb-4" title={error.general} />

      <Form
        noValidate
        className="space-y-5"
        action={action}
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <SignUpFormFields ref={emailInputRef} state={state} error={error} />

        <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
          Registrovat
        </Button>
      </Form>
    </section>
  );
}
