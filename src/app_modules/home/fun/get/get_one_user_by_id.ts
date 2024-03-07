"use server";

import prisma from "@/app/lib/prisma";

export async function user_getOneById(userId: string) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      Profile: true,
    },
  });

  return data;
}
