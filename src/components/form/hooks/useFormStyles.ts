import { useMemo } from "react";

import { cn } from "@/lib/utils/styles";

export const useFormStyles = () => {
  const formBaseStyles = "space-y-6";
  const alertBaseStyles = "mb-4";

  const getFormStyles = useMemo(
    () => (className?: string) => cn(formBaseStyles, className),
    [formBaseStyles]
  );

  const getAlertStyles = useMemo(
    () => (className?: string) => cn(alertBaseStyles, className),
    [alertBaseStyles]
  );

  const getHeadingStyles = useMemo(
    () => (className?: string, level?: number) => {
      const levelStyles = {
        1: "text-3xl font-bold",
        2: "text-2xl font-semibold",
        3: "text-xl font-semibold",
        4: "text-lg font-medium",
        5: "text-base font-medium",
        6: "text-sm font-medium",
      };

      const levelClass = level
        ? levelStyles[level as keyof typeof levelStyles]
        : "text-2xl font-semibold";
      return cn(levelClass, "text-gray-900 mb-4", className);
    },
    []
  );

  return {
    getFormStyles,
    getAlertStyles,
    getHeadingStyles,
  };
};
