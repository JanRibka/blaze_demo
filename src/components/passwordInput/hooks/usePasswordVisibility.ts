import { useCallback, useState } from "react";

import { UsePasswordVisibilityReturn } from "../types";

export const usePasswordVisibility = (
  initialVisible: boolean = false
): UsePasswordVisibilityReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return {
    isVisible,
    toggleVisibility,
  };
};
