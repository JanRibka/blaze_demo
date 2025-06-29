import { compare } from "bcrypt";
import { AdapterUser } from "next-auth/adapters";
import { JWTEncodeParams } from "next-auth/jwt";

import { User } from "@prisma/client";

import AuthError from "../errors/AuthError";
import { deleteSessionByIdUser } from "../repositories/sessionRepository";
import { createUser, getUserByEmail } from "../repositories/userRepository";
import { getCookieAsync } from "./cookieService";
import { hashPassword } from "./hashService";
import { createSession, getSessionExists } from "./sessionService";

export async function signUpVerifyUser(email: string): Promise<void> {
  const user = await getUserByEmail(email);

  if (user) {
    throw new AuthError("Nelze vytvořit účet. Zkuste se přihlásit.");
  }
}

export async function logInVerifyUser(
  email: string,
  password: string
): Promise<AdapterUser> {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthError("Neplatné uživatelské jméno, nebo heslo");
  }

  if (!(await checkCredentials(user, password))) {
    throw new AuthError("Neplatné uživatelské jméno, nebo heslo");
  }

  return {
    id: user.idUser,
    name: "",
    email: user.email,
    emailVerified: null,
    image: "",
  };
}

export async function logIn(
  params: JWTEncodeParams
): Promise<string | undefined> {
  const sessionCookieValue = await getCookieAsync("authjs.session-token");
  const idUser: string = (params.token?.idUser as string) ?? "";

  if (sessionCookieValue) {
    // Scenario added here:
    // 1) User logs in but never uses Session and does not logout
    // 2) Session is stolen
    // 3) If 1 & 2, reuse detection is needed to clear all Sessions when user logs in

    const foundSession = await getSessionExists(sessionCookieValue);

    // Detected refresh token reuse!
    if (!foundSession) {
      // Clear out ALL previous sessions
      await deleteSessionByIdUser(idUser);
    }
  }

  return await createSession(params);
}

export async function checkCredentials(
  user: User,
  password: string
): Promise<boolean> {
  return await compare(password, user.password);
}

export async function registerUser(
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = await hashPassword(password);

  return await createUser(email, hashedPassword);
}
