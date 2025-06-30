"use client";

import { useState } from "react";

import EyeFilledIcon from "@/lib/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/lib/icons/EyeSlashFilledIcon";
import { Input, InputProps } from "@heroui/react";

type Props = InputProps & {};

export default function PasswordInput({
  value,
  onChange,
  ...restProps
}: Props) {
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setLocalValue(value);
    onChange?.(event);
  };

  return (
    <Input
      value={localValue}
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
