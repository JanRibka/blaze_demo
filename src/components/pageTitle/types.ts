import { HTMLAttributes } from "react";

export interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  subtitle?: string;
}
