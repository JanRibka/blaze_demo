"use client";

import { useEffect, useState } from "react";
import * as Yup from "yup";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import EyeFilledIcon from "@/lib/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/lib/icons/EyeSlashFilledIcon";
import { validateField } from "@/lib/validations/validations/validateField";
import { Input, InputProps } from "@heroui/react";

type Props<T extends object> = Omit<
  InputProps,
  "isInvalid" | "errorMessage"
> & {
  validationSchema: Yup.ObjectSchema<T>;
  error: Record<string, string>;
};

export default function ValidatePasswordInput<T extends object>({
  value,
  error,
  name,
  onChange,
  validationSchema,
  ...restProps
}: Props<T>) {
  const isFirstRender = useIsFirstRender();

  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const setErrorMessage = (value: string) => {
    if (!value) {
      setLocalErrorMessage("");
      return;
    }

    setLocalErrorMessage(validateField<T>(validationSchema, name!, value));
  };

  useEffect(() => {
    if (typeof error[name!] === "string") {
      setLocalErrorMessage(error[name!] as string);
    }
  }, [error, name]);

  useEffect(() => {
    if (isFirstRender) return;

    setLocalValue(value ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setLocalValue(value);
    setErrorMessage(value);
    onChange?.(event);
  };

  return (
    <Input
      value={localValue}
      name={name}
      isInvalid={!!localErrorMessage}
      errorMessage={localErrorMessage}
      {...restProps}
      type={isVisible ? "text" : "password"}
      onChange={handleChange}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-hidden"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
          ) : (
            <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
          )}
        </button>
      }
    />
  );
}
