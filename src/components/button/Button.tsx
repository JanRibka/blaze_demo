"use client";

import { mergeStyles } from "@/lib/utils/styles";
import { Button as HeroButton } from "@heroui/react";

import { ButtonProps } from "./types";

export default function Button({
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <HeroButton
      className={mergeStyles(
        "font-semibold tracking-tight leading-7 text-sm uppercase",
        className
      )}
      {...restProps}
    >
      {children}
    </HeroButton>
  );
}
