"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function notifikasi_countUserNotifikasi() {
  const userId = await user_getOneUserId();

  const count = await prisma.notifikasi.findMany({
    where: {
      userId: userId,
      isRead: false,
      userRoleId: "1"
    },
  });

  return count.length;
}
