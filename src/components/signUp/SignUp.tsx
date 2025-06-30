"use client";

import LoginUser from "./components/LogInUser";
import SignUpForm from "./components/SignUpForm";
import SignUpSuccess from "./components/SignUpSuccess";
import { useSignUpAction } from "./hooks/useSignUpAction";
import { useSignUpForm } from "./hooks/useSignUpForm";

export default function SignUp() {
  const [state, action, isLoading] = useSignUpAction();
  const { errors, handleSubmit, handleChange } = useSignUpForm(state);

  if (state.generalState === "success") {
    return <SignUpSuccess />;
  }

  return (
    <div className="space-y-8">
      <SignUpForm
        state={state}
        error={errors}
        isLoading={isLoading}
        action={action}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <LoginUser />
    </div>
  );
}
