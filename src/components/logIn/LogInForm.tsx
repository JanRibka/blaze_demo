"use client";

import { useEffect, useRef } from "react";

import TLogInForm from "@/lib/types/TLogInForm";
import { nameof } from "@/lib/utils/nameof";
import { Input } from "@heroui/react";

import Button from "../button/Button";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";

type Props = {
  isLoading: boolean;
  action: (payload: FormData) => void;
};

export default function LogInForm({ isLoading, action }: Props) {
  const refLogin = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Přihlášení</FormHeading>

        <Form className="flex flex-col items-center" action={action}>
          <Input
            ref={refLogin}
            name={nameof<TLogInForm>("email")}
            label="Email"
            className="mb-4"
            required
            autoComplete="username"
            fullWidth
            variant="faded"
            color="primary"
            type="email"
          />

          <Input
            name={nameof<TLogInForm>("password")}
            label="Heslo"
            className="mb-4"
            required
            autoComplete="current-password"
            fullWidth
            variant="faded"
            color="primary"
            type="password"
          />

          <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
            Přihlásit
          </Button>
        </Form>
      </div>
    </section>
  );
}
