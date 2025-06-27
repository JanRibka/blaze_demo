"use server";

import { signIn } from "@/config/auth/auth";
import AuthError from "@/lib/errors/AuthError";
import TFormActionState from "@/lib/types/TFormActionState";
import TLogInError from "@/lib/types/TLogInError";

type TLoginFormState = TFormActionState<TLogInError>;

export const logInAction = async (
  _prev: TLoginFormState,
  payload: FormData
): Promise<TLoginFormState> => {
  const email = payload.get("email") as string;
  const password = payload.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      error: undefined,
    };
  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      const errorMessage = error.message;

      return {
        error: {
          general: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      error: {
        general: "Přihlášení skončilo chybou, zkuste to prosím znovu",
        timestamp: new Date().toISOString(),
      },
    };
  }
};
