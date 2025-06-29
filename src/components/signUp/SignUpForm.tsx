"use client";

import { useEffect, useRef } from "react";

import TSignUpForm from "@/lib/types/TSignUpForm";
import { nameof } from "@/lib/utils/nameof";
import { Input } from "@heroui/react";

import Button from "../button/Button";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";

type Props = {
  isLoading: boolean;
  action: (payload: FormData) => void;
};

export default function SignUpForm({ isLoading, action }: Props) {
  const refLogin = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Registrace</FormHeading>

        <Form className="flex flex-col items-center" action={action}>
          <Input
            ref={refLogin}
            name={nameof<TSignUpForm>("email")}
            label="Email"
            className="mb-4"
            required
            autoComplete="email"
            fullWidth
            variant="faded"
            color="primary"
            type="email"
          />

          <Input
            name={nameof<TSignUpForm>("password")}
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
            Registrovat
          </Button>
        </Form>
      </div>
    </section>
  );
}
