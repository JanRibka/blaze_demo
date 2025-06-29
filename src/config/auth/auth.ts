import NextAuth from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { logIn, logInVerifyUser } from "@/lib/services/authService";

import { prisma } from "../prisma/prisma";
import PrismaAdapter from "../prisma/PrismAdapter";

const adapter = PrismaAdapter(prisma);

const credentials: CredentialsConfig = {
  id: "credentials",
  type: "credentials",
  name: "Credentials",
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const email = credentials.email as string;
    const password = credentials.password as string;

    const user = await logInVerifyUser(email, password);

    return {
      ...user,
    };
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [Credentials(credentials), Google],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
        token.idUser = user.id;
      }

      return token;
    },
  },

  session: {
    strategy: "database",
  },

  jwt: {
    encode: async function (params) {
      const sessionToken = await logIn(params);

      if (typeof sessionToken === "string") {
        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
});
