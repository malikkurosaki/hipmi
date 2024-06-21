"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function notifikasi_getByUserId() {
  const userId = await user_getOneUserId();

  const data = await prisma.notifikasi.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userId,
      userRoleId: "1",
    },
  });

  return data;
}
