import { HTMLAttributes } from "react";

import { mergeStyles } from "@/lib/utils/styles";

type Props = HTMLAttributes<HTMLHeadingElement> & {};

export default function FormHeading({
  children,
  className,
  ...restProps
}: Props) {
  return (
    <h3
      className={mergeStyles("text-2xl font-bold text-slate-900", className)}
      {...restProps}
    >
      {children}
    </h3>
  );
}
