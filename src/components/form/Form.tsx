import { forwardRef } from "react";

import { useFormStyles } from "./hooks/useFormStyles";
import { FormProps } from "./types";

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...restProps }, ref) => {
    const { getFormStyles } = useFormStyles();

    return (
      <form ref={ref} className={getFormStyles(className)} {...restProps}>
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";

export default Form;
