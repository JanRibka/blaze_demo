import { useActionState } from "react";

import { signUpAction } from "@/actions/auth";

export const useSignUpAction = () => {
  return useActionState(signUpAction, {
    generalState: "undefined",
  });
};
