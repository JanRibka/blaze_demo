type TValidationResult<T> = {
  success: boolean;
  error: T;
};

export default TValidationResult;
