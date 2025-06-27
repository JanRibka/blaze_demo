import { prisma } from "@/config/prisma/prisma";
import { Session } from "@prisma/client";

export async function createSession(
  sessionToken: string,
  idUser: string,
  expires: Date
): Promise<Session | undefined> {
  return await prisma.session.create({
    data: {
      sessionToken: sessionToken,
      userId: idUser,
      expires: expires,
    },
  });
}

export async function getSessionBySessionToken(
  sessionToken: string
): Promise<Session | null> {
  return await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });
}

export async function deleteSessionByIdUser(idUser: string): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      userId: idUser,
    },
  });
}
