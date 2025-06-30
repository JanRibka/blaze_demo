import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    handleSignOut,
    isLoading,
  };
};
