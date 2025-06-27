import type { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";

export default function PrismaAdapter(
  prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): Adapter {
  const p = prisma as PrismaClient;

  return {
    async createUser(user) {
      return user;
    },
    async getUser(id) {
      return {
        id: id,
        email: "",
        emailVerified: new Date(),
        image: "",
        name: "",
      };
    },
    async getUserByEmail(email) {
      return {
        id: "",
        email: email,
        emailVerified: new Date(),
        image: "",
        name: "",
      };
    },
    async getUserByAccount() {
      return null;
    },
    async updateUser(user) {
      return {
        id: user.id,
        email: user.email ?? "",
        emailVerified: user.emailVerified ?? new Date(),
        image: user.image,
        name: user.name,
      };
    },
    async deleteUser(userId) {
      return {
        id: userId,
        email: "",
        emailVerified: new Date(),
        image: "",
        name: "",
      };
    },
    async linkAccount() {
      return null;
    },
    async unlinkAccount() {
      return;
    },
    async createSession(session) {
      return await p.session.create({
        data: {
          ...session,
        },
      });
    },
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!userAndSession) return null;

      const { user: sessionUser, ...sessionSession } = userAndSession;

      const user: AdapterUser = {
        id: sessionUser.idUser,
        name: "",
        email: sessionUser.email,
        emailVerified: null,
        image: "",
      };

      const session: AdapterSession = {
        expires: sessionSession.expires,
        sessionToken: sessionSession.sessionToken,
        userId: sessionSession.userId,
      };

      return { user, session } as {
        user: AdapterUser;
        session: AdapterSession;
      };
    },
    async updateSession(session) {
      return await p.session.update({
        where: { sessionToken: session.sessionToken },
        data: session,
      });
    },
    async deleteSession(sessionToken) {
      return await p.session.delete({ where: { sessionToken } });
    },
    async createVerificationToken() {
      return null;
    },
    async useVerificationToken() {
      return null;
    },
  };
}

/** @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined */
// function stripUndefined<T>(obj: T) {
//   const data = {} as T;
//   for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key];
//   return { data };
// }
