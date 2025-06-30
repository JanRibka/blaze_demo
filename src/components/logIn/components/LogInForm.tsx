"use client";

import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import FormAlert from "@/components/form/FormAlert";
import FormHeading from "@/components/form/FormHeading";

import { LoginFormFields } from "./LoginFormFields";

import type { LoginFormProps } from "../types";
export const LoginForm = ({
  state,
  error,
  isLoading,
  action,
  onSubmit,
  onChange,
}: LoginFormProps) => {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <FormHeading className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Přihlášení
        </FormHeading>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Přihlaste se do svého účtu
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
        <LoginFormFields state={state} error={error} />

        <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
          Přihlásit
        </Button>
      </Form>
    </section>
  );
};
