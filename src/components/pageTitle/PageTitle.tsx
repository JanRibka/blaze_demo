import { cn } from "@/lib/utils/styles";

import { PageTitleProps } from "./types";

export default function PageTitle({
  className,
  children,
  subtitle,
  ...restProps
}: PageTitleProps) {
  return (
    <div
      className={cn("mb-8 text-center sm:text-left", className)}
      {...restProps}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
        {children}
      </h1>
      {subtitle && (
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
