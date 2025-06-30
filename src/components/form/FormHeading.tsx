import { createElement, forwardRef, JSX } from "react";

import { useFormStyles } from "./hooks/useFormStyles";
import { FormHeadingProps } from "./types";

const FormHeading = forwardRef<HTMLHeadingElement, FormHeadingProps>(
  ({ children, className, level = 2, ...restProps }, ref) => {
    const { getHeadingStyles } = useFormStyles();
    const tagName = `h${level}` as keyof JSX.IntrinsicElements;

    return createElement(
      tagName,
      {
        ref,
        className: getHeadingStyles(className, level),
        ...restProps,
      },
      children
    );
  }
);

FormHeading.displayName = "FormHeading";

export default FormHeading;
