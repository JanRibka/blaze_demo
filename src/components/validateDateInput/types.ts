import * as Yup from "yup";

import { DateInputProps } from "@heroui/date-input";

import type { DateValue } from "@internationalized/date";

export interface ValidateDateInputProps<T extends object>
  extends Omit<
    DateInputProps,
    "isInvalid" | "errorMessage" | "onChange" | "onValueChange"
  > {
  validationSchema: Yup.ObjectSchema<T>;
  error: Record<string, string>;
  onChange?: (value: DateValue | null) => void;
  suppressOnChangeOnError: boolean;
}

export interface UseValidateDateInputProps<T extends object> {
  initialValue: DateValue | null;
  name?: string;
  validationSchema: Yup.ObjectSchema<T>;
  error: Record<string, string>;
  onChange?: (value: DateValue | null) => void;
  suppressOnChangeOnError: boolean;
}

export interface UseValidateDateInputReturn {
  localValue: DateValue | null;
  localErrorMessage: string;
  handleChange?: (value: DateValue | null) => void;
  isInvalid: boolean;
}
