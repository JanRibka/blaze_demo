import { memo } from "react";

import EyeFilledIcon from "@/lib/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/lib/icons/EyeSlashFilledIcon";

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export const PasswordToggleButton = memo<PasswordToggleButtonProps>(
  ({ isVisible, onToggle, ariaLabel = "Přepnout viditelnost hesla" }) => {
    return (
      <button
        aria-label={ariaLabel}
        className="focus:outline-hidden"
        type="button"
        onClick={onToggle}
      >
        {isVisible ? (
          <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
        ) : (
          <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
        )}
      </button>
    );
  }
);

PasswordToggleButton.displayName = "PasswordToggleButton";
