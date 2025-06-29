"use client";

import { useActionState, useEffect } from "react";

import { signUpAction } from "@/actions/auth";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import routes from "@/lib/routes/routes";
import { addToast } from "@heroui/react";

import { ClientReplace } from "../clientReplace/ClientReplace";
import LoginUser from "./LogInUser";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(signUpAction, {});

  useEffect(() => {
    if (isFirstRender || !state.error) return;

    showError(state.error.general ?? "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.error]);

  const showError = (errorMessage: string) => {
    addToast({ title: "Chyba", color: "danger", description: errorMessage });
  };

  if (state.generalState === "success") {
    return <ClientReplace to={routes.LogIn} />;
  }

  return (
    <>
      <SignUpForm isLoading={isLoading} action={action} />
      <LoginUser />
    </>
  );
}
