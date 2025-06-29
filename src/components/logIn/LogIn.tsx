"use client";

import { useActionState, useEffect } from "react";

import { logInAction } from "@/actions/auth";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import routes from "@/lib/routes/routes";
import { addToast } from "@heroui/react";

import { ClientReplace } from "../clientReplace/ClientReplace";
import CreateAccount from "./CreateAccount";
import LogInForm from "./LogInForm";

export default function LogIn() {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(logInAction, {});

  useEffect(() => {
    if (isFirstRender || !state.error) return;

    showError(state.error.general ?? "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.error]);

  const showError = (errorMessage: string) => {
    addToast({ title: "Chyba", color: "danger", description: errorMessage });
  };

  if (state.generalState === "success") {
    return <ClientReplace to={routes.Root} />;
  }

  return (
    <>
      <LogInForm isLoading={isLoading} action={action} />
      <CreateAccount />
    </>
  );
}
