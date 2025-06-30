import { memo } from "react";

import Alert from "@/components/alert/Alert";

import { useFormStyles } from "./hooks/useFormStyles";
import { FormAlertProps } from "./types";

const FormAlert = memo<FormAlertProps>(
  ({ className, title, color = "danger", variant = "faded", ...restProps }) => {
    const { getAlertStyles } = useFormStyles();

    if (!title) {
      return null;
    }

    return (
      <div className={getAlertStyles(className)}>
        <Alert title={title} color={color} variant={variant} {...restProps} />
      </div>
    );
  }
);

FormAlert.displayName = "FormAlert";

export default FormAlert;
