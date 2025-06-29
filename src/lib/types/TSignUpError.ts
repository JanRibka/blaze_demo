import TErrorGeneral from "./TErrorGeneral";
import TSignUpForm from "./TSignUpForm";

type TSignUpError = {
  [K in keyof TSignUpForm | TErrorGeneral]?: string;
};

export default TSignUpError;
