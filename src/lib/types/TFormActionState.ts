type TFormActionState<Error extends object> = {
  generalState?: "success" | "error";
  error?: Error;
};

export default TFormActionState;
