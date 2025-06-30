import { InferType, string } from "yup";

import confirmPasswordValidationSchema from "./confirmPasswordValidationSchema";

const signUpFormValidationSchema = confirmPasswordValidationSchema.shape({
  email: string()
    .required("Email je povinný")
    .email("Email není platná emailová adresa")
    .max(50, "Email může obsahovat maximálně 50 znaků")
    .matches(
      new RegExp("\\.[a-zA-Z]{2,4}$"),
      "Email není platná emailová adresa"
    ),
});

export default signUpFormValidationSchema;

export type TSignUpForm = InferType<typeof signUpFormValidationSchema>;
export type TSignUpFormError = {
  [K in keyof TSignUpForm | "general" | "timestamp"]?: string;
};
