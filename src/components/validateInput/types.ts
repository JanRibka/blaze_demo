import * as Yup from "yup";

import { InputProps } from "@heroui/react";

export interface ValidateInputProps<T extends object>
  extends Omit<
    InputProps,
    "isInvalid" | "errorMessage" | "onChange" | "onValueChange"
  > {
  validationSchema: Yup.ObjectSchema<T>;
  error: Record<string, string>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
}

export interface UseValidateInputProps<T extends object> {
  initialValue?: string;
  name?: string;
  validationSchema: Yup.ObjectSchema<T>;
  error: Record<string, string>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
}

export interface UseValidateInputReturn {
  localValue: string;
  localErrorMessage: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
}
