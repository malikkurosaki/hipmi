"use server";

import prisma from "@/app/lib/prisma";

export async function user_getOneByUserId(userId: string) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      active: true,
      username: true,
      masterUserRoleId: true,
      Profile: true,
    },
  });

  return data;
}
