"use client";

import { cn } from "@/lib/utils/styles";
import { Button as HeroButton } from "@heroui/react";

import { ButtonProps } from "./types";

export default function Button({
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <HeroButton
      className={cn(
        "font-semibold tracking-tight leading-7 text-sm uppercase",
        className
      )}
      {...restProps}
    >
      {children}
    </HeroButton>
  );
}
