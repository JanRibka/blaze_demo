import TFormActionState from "@/lib/types/TFormActionState";
import {
  TSignUpForm,
  TSignUpFormError,
} from "@/lib/validations/schemas/signUpFormValidationSchema";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignUpState
  extends TFormActionState<TSignUpForm, TSignUpFormError> {}

export interface SignUpFormProps {
  state: SignUpState;
  error: TSignUpFormError;
  isLoading: boolean;
  action: (payload: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: () => void;
}

export interface UseSignUpFormReturn {
  errors: TSignUpFormError;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
  clearGeneralError: () => void;
}
