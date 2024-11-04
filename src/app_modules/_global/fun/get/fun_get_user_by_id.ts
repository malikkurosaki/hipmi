"use server";

import { prisma } from "@/app/lib";

export async function funGlobal_getUserById({ userId }: { userId: string }) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      Profile: true,
    },
  });

  return data;
}
