import TErrorGeneral from "./TErrorGeneral";
import TLogInForm from "./TLogInForm";

type TLogInError = {
  [K in keyof TLogInForm | TErrorGeneral]?: string;
};

export default TLogInError;
