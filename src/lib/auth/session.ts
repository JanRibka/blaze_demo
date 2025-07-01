import { Session } from "next-auth";

import { auth } from "@/config/auth/auth";

import UnauthorizedError from "../errors/UnauthorizedError";

export async function getAuthorizationStatus() {
  const session = await auth();
  const isAuthenticated = !!session?.user?.id;

  return {
    session,
    isAuthenticated,
  };
}

export async function requireAuth(): Promise<{ session: Session | null }> {
  const { session, isAuthenticated } = await getAuthorizationStatus();

  if (!isAuthenticated) {
    throw new UnauthorizedError();
  }

  return { session };
}
