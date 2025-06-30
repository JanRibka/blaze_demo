import { TRouteValue } from "@/lib/routes/routes";
import TFormActionState from "@/lib/types/TFormActionState";
import {
  TLogInForm,
  TLogInFormError,
} from "@/lib/validations/schemas/logInValidationSchema";

export interface UseLoginFormReturn {
  state: TFormActionState<TLogInForm, TLogInFormError>;
  action: (payload: FormData) => void;
  isLoading: boolean;
  error: TLogInFormError;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
  clearError: (field: keyof TLogInFormError) => void;
}

export interface UseLoginRedirectReturn {
  shouldRedirect: boolean;
  redirectPath: TRouteValue;
}

export interface LoginSuccessProps {
  redirectPath: TRouteValue;
}

export interface LoginFormFieldsProps {
  state: TFormActionState<TLogInForm, TLogInFormError>;
  error: TLogInFormError;
}

export interface LoginFormProps {
  state: TFormActionState<TLogInForm, TLogInFormError>;
  error: TLogInFormError;
  isLoading: boolean;
  action: (payload: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: () => void;
}
