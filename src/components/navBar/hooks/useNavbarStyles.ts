import { useMemo } from "react";

import { mergeStyles } from "@/lib/utils/styles";

import { NavBarProps, SignOutButtonProps } from "../types";

export const useNavBarStyles = () => {
  const getNavBarStyles = useMemo(
    () =>
      ({
        variant = "default",
        sticky = false,
        className,
      }: NavBarProps & { className?: string }) => {
        const baseStyles = "w-full transition-all duration-300 ease-in-out";

        const variantStyles = {
          default:
            "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm",
          glass:
            "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg",
          solid: "bg-white border-b border-gray-200 shadow-md",
        };

        const stickyStyles = sticky ? "sticky top-0 z-50" : "";

        return mergeStyles(
          baseStyles,
          variantStyles[variant],
          stickyStyles,
          className
        );
      },
    []
  );

  const getUpperBarStyles = useMemo(
    () => (className?: string) =>
      mergeStyles(
        "h-14 sm:h-16 lg:h-18 xl:h-20",
        "flex items-center justify-between",
        "px-4 sm:px-6 md:px-8 lg:px-12",
        "transition-all duration-200 ease-linear",
        className
      ),
    []
  );

  const getSignOutButtonStyles = useMemo(
    () =>
      ({
        variant = "default",
        size = "md",
        className,
      }: SignOutButtonProps & { className?: string }) => {
        const baseStyles =
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";

        const variantStyles = {
          default:
            "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-200",
          ghost: "text-gray-600 hover:text-red-600 hover:bg-red-50",
          minimal: "text-gray-500 hover:text-red-500",
        };

        const sizeStyles = {
          sm: "px-3 py-1.5 text-sm",
          md: "px-4 py-2 text-sm",
          lg: "px-5 py-2.5 text-base",
        };

        return mergeStyles(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        );
      },
    []
  );

  return {
    getNavBarStyles,
    getUpperBarStyles,
    getSignOutButtonStyles,
  };
};
