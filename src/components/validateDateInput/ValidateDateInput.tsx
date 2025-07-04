import { forwardRef } from "react";

import { DateInput } from "@heroui/date-input";
import { I18nProvider } from "@react-aria/i18n";

import { useValidateDateInput } from "./hooks/useValidateDateInput";

import type { ValidateDateInputProps } from "./types";

const ValidateInput = <T extends object>(
  {
    value,
    error,
    name,
    onChange,
    validationSchema,
    suppressOnChangeOnError,
    ...restProps
  }: ValidateDateInputProps<T>,
  ref?: React.Ref<HTMLInputElement>
) => {
  const { localValue, localErrorMessage, handleChange, isInvalid } =
    useValidateDateInput({
      initialValue: value ?? null,
      name,
      validationSchema,
      error,
      onChange,
      suppressOnChangeOnError,
    });

  return (
    <I18nProvider locale="cs-CZ">
      <DateInput
        ref={ref}
        value={localValue}
        name={name}
        isInvalid={isInvalid}
        errorMessage={localErrorMessage}
        onChange={handleChange}
        autoCorrect={restProps.autoCorrect}
        autoCapitalize={restProps.autoCapitalize}
        {...restProps}
      />
    </I18nProvider>
  );
};

// Generic forwardRef wrapper to maintain type safety
const ValidateInputWithRef = forwardRef(ValidateInput) as <T extends object>(
  props: ValidateDateInputProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

export default ValidateInputWithRef;
