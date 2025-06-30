"use client";

import { LoginForm } from "./components/LogInForm";
import { LoginSuccess } from "./components/LoginSuccess";
import CreateAccount from "./CreateAccount";
import { useLoginForm } from "./hooks/useLoginForm";
import { useLoginRedirect } from "./hooks/useLoginRedirect";

export default function LogIn() {
  const { state, action, isLoading, error, handleSubmit, handleChange } =
    useLoginForm();

  const { shouldRedirect, redirectPath } = useLoginRedirect(state);

  if (shouldRedirect) {
    return <LoginSuccess redirectPath={redirectPath} />;
  }

  return (
    <div className="space-y-8">
      <LoginForm
        state={state}
        error={error}
        isLoading={isLoading}
        action={action}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <CreateAccount />
    </div>
  );
}
