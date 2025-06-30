"use server";

import { signIn } from "@/config/auth/auth";
import AuthError from "@/lib/errors/AuthError";
import { registerUser, signUpVerifyUser } from "@/lib/services/authService";
import TFormActionState from "@/lib/types/TFormActionState";
import logInActionValidator from "@/lib/validations/actionValidators/logInActionValidator";
import signUpActionValidator from "@/lib/validations/actionValidators/signUpActionValidator";
import {
  TLogInForm,
  TLogInFormError,
} from "@/lib/validations/schemas/logInValidationSchema";
import {
  TSignUpForm,
  TSignUpFormError,
} from "@/lib/validations/schemas/signUpFormValidationSchema";

type TSignUpFormState = TFormActionState<TSignUpForm, TSignUpFormError>;
type TLoginFormState = TFormActionState<TLogInForm, TLogInFormError>;

export const signUpAction = async (
  _prev: TSignUpFormState,
  formData: FormData
): Promise<TSignUpFormState> => {
  const validationResult = await signUpActionValidator(formData);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const form: TSignUpForm = {
    email,
    password,
    confirmPassword,
  };

  if (!validationResult.success) {
    return { generalState: "error", form, error: validationResult.error };
  }

  try {
    await signUpVerifyUser(email);
    await registerUser(email, password);

    return {
      generalState: "success",
      form,
      error: undefined,
    };
  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      const errorMessage = error.message;

      return {
        generalState: "error",
        form,
        error: {
          general: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      generalState: "error",
      form,
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
  const validationResult = await logInActionValidator(payload);

  const email = payload.get("email") as string;
  const password = payload.get("password") as string;

  const form: TLogInForm = {
    email,
    password,
  };

  if (!validationResult.success) {
    return { generalState: "error", form, error: validationResult.error };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      generalState: "success",
      form,
      error: undefined,
    };
  } catch (error) {
    const isAuthError = error instanceof AuthError;

    if (isAuthError) {
      const errorMessage = error.message;

      return {
        generalState: "error",
        form,
        error: {
          general: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      generalState: "error",
      form,
      error: {
        general: "Přihlášení skončilo chybou, zkuste to prosím znovu",
        timestamp: new Date().toISOString(),
      },
    };
  }
};
