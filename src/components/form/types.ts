import { FormHTMLAttributes, HTMLAttributes } from "react";

import { AlertProps } from "@heroui/react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export interface FormAlertProps extends Omit<AlertProps, "children"> {
  title?: string;
}

export interface FormHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
