"use server";

import prisma from "@/app/lib/prisma";

export async function User_getOneById(userId: string) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      Profile: true,
    },
  });

  return data;
}
