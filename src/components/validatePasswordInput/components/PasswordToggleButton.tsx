import { memo } from "react";

import EyeFilledIcon from "@/lib/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/lib/icons/EyeSlashFilledIcon";

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PasswordToggleButton = memo<PasswordToggleButtonProps>(
  ({ isVisible, onToggle }) => {
    return (
      <button
        aria-label={isVisible ? "Skrýt heslo" : "Zobrazit heslo"}
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
