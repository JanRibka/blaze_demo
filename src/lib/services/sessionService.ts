import { JWTEncodeParams } from "next-auth/jwt";
import { v4 as uuid } from "uuid";

import {
  createSession as createSessionRepository,
  getSessionBySessionToken,
} from "@/lib/repositories/sessionRepository";

export async function createSession(
  params: JWTEncodeParams
): Promise<string | undefined> {
  if (params.token?.credentials) {
    const sessionToken = uuid();

    if (!params.token.sub) {
      throw new Error("No user ID found in token");
    }

    const createdSession = await createSessionRepository(
      sessionToken,
      params.token.idUser as string,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dní
    );
    if (!createdSession) {
      throw new Error("Failed to create session");
    }

    return sessionToken;
  }
}

export async function getSessionExists(sessionToken: string): Promise<boolean> {
  return (await getSessionBySessionToken(sessionToken)) !== null;
}
