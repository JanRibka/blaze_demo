import { useState } from "react";

import { UsePasswordVisibilityReturn } from "../types";

export const usePasswordVisibility = (): UsePasswordVisibilityReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return {
    isVisible,
    toggleVisibility,
  };
};
