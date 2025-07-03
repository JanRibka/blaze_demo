import { cn } from "@/lib/utils/styles";

import { PageContentProps } from "./types";

export default function PageContent({
  className,
  children,
  ...restProps
}: PageContentProps) {
  return (
    <div
      className={cn(
        // Base styles
        "flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700",
        "p-6 sm:p-8 lg:p-10",
        // Gradient border effect
        "relative before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
        "before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-indigo-500",
        "before:-z-10 before:opacity-20",
        // Animation
        "animate-in fade-in-0 slide-in-from-bottom-4 duration-700",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
