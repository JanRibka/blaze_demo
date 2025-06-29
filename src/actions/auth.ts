"use server";

import { signIn } from "@/config/auth/auth";
import AuthError from "@/lib/errors/AuthError";
import { registerUser, signUpVerifyUser } from "@/lib/services/authService";
import TFormActionState from "@/lib/types/TFormActionState";
import TLogInError from "@/lib/types/TLogInError";
import TSignUpError from "@/lib/types/TSignUpError";

type TSignUpFormState = TFormActionState<TSignUpError>;
type TLoginFormState = TFormActionState<TLogInError>;

export const signUpAction = async (
  _prev: TSignUpFormState,
  formData: FormData
): Promise<TSignUpFormState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signUpVerifyUser(email);
    await registerUser(email, password);

    return {
      generalState: "success",
      error: undefined,
    };
  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      const errorMessage = error.message;

      return {
        generalState: "error",
        error: {
          general: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      generalState: "error",
      error: {
        general: "Registrace skončila chybou, zkuste to prosím znovu",
        timestamp: new Date().getTime().toString(),
      },
    };
  }
};

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
      generalState: "success",
      error: undefined,
    };
  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      const errorMessage = error.message;

      return {
        generalState: "error",
        error: {
          general: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      generalState: "error",
      error: {
        general: "Přihlášení skončilo chybou, zkuste to prosím znovu",
        timestamp: new Date().toISOString(),
      },
    };
  }
};
