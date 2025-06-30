type TFormActionState<Form extends object, Error extends object> = {
  generalState: "undefined" | "success" | "error";
  form?: Form;
  error?: Error;
};

export default TFormActionState;
