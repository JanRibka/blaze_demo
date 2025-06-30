import { InferType, object, ref, string } from "yup";

const confirmPasswordValidationSchema = object().shape({
  password: string()
    .required("Heslo je povinné")
    .matches(
      new RegExp("[a-z]"),
      "Heslo musí obsahovat alespoň jedno malé písmeno"
    )
    .matches(
      new RegExp("[A-Z]"),
      "Heslo musí obsahovat alespoň jedno velké písmeno"
    )
    .matches(new RegExp("[0-9]"), "Heslo musí obsahovat alespoň jednu číslici")
    .min(8, "Heslo musí obsahovat alespoň 8 znaků")
    .max(24, "Heslo může obsahovat maximálně 24 znaků"),
  confirmPassword: string()
    .required("Heslo pro potvrzení je povinné")
    .oneOf([ref("password")], "Hesla se neshodují"),
});

export default confirmPasswordValidationSchema;

export type TConfirmPasswordForm = InferType<
  typeof confirmPasswordValidationSchema
>;
export type TConfirmPasswordFormError = {
  [K in keyof TConfirmPasswordForm]?: string;
};
