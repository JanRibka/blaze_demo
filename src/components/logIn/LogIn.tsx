"use client";

import { useActionState, useEffect } from "react";

import { logInAction } from "@/actions/auth";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { addToast } from "@heroui/react";

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
    addToast({ title: "Cbyba", color: "danger", description: errorMessage });
  };

  return <LogInForm isLoading={isLoading} action={action} />;
}
