"use client";

import { useMemo } from "react";

import routes from "@/lib/routes/routes";
import TFormActionState from "@/lib/types/TFormActionState";
import {
  TLogInForm,
  TLogInFormError,
} from "@/lib/validations/schemas/logInValidationSchema";

import type { UseLoginRedirectReturn } from "../types";

export const useLoginRedirect = (
  state: TFormActionState<TLogInForm, TLogInFormError>
): UseLoginRedirectReturn => {
  const shouldRedirect = useMemo(
    () => state.generalState === "success",
    [state.generalState]
  );

  const redirectPath = useMemo(() => routes.Root, []);

  return { shouldRedirect, redirectPath };
};
