import { forwardRef, memo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";

import { useNavBarStyles } from "../hooks/useNavbarStyles";
import { useSignOut } from "../hooks/useSignOut";
import { SignOutButtonProps } from "../types";

const SignOutButton = memo(
  forwardRef<HTMLButtonElement, SignOutButtonProps>(
    (
      {
        variant = "default",
        size = "md",
        showIcon = true,
        showText = true,
        loading: externalLoading = false,
        className,
        onClick,
        ...restProps
      },
      ref
    ) => {
      const { handleSignOut, isLoading: internalLoading } = useSignOut();
      const { getSignOutButtonStyles } = useNavBarStyles();

      const isLoading = externalLoading || internalLoading;

      const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          onClick(e);
        } else {
          await handleSignOut();
        }
      };

      return (
        <button
          ref={ref}
          className={getSignOutButtonStyles({ variant, size, className })}
          onClick={handleClick}
          disabled={isLoading}
          aria-label="Odhlásit se z aplikace"
          {...restProps}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
          ) : (
            showIcon && <FaSignOutAlt className="w-4 h-4" />
          )}

          {showText && (
            <span className={`${size === "sm" ? "hidden sm:inline" : ""}`}>
              {isLoading ? "Odhlašování..." : "Odhlásit se"}
            </span>
          )}
        </button>
      );
    }
  )
);

SignOutButton.displayName = "SignOutButton";

export default SignOutButton;
