import { InferType, object, string } from "yup";

import TErrorGeneral from "@/lib/types/TErrorGeneral";

const logInFormValidationSchema = object().shape({
  email: string()
    .required("Email je povinný")
    .email("Email není platná emailová adresa")
    .matches(
      new RegExp("\\.[a-zA-Z]{2,4}$"),
      "Email není platná emailová adresa"
    ),
  password: string().required("Heslo je povinné"),
});

export default logInFormValidationSchema;

export type TLogInForm = InferType<typeof logInFormValidationSchema>;
export type TLogInFormError = {
  [K in keyof TLogInForm | TErrorGeneral]?: string;
};
