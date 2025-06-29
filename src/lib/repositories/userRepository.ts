import { prisma } from "@/config/prisma/prisma";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function createUser(
  email: string,
  hashedPassword: string
): Promise<User> {
  return await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
}
