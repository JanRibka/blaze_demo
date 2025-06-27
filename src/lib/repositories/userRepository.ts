import { prisma } from "@/config/prisma/prisma";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}
