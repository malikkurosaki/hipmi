"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function adminNotifikasi_countNotifikasi() {
  const adminId = await user_getOneUserId();

  const data = await prisma.notifikasi.findMany({
    where: {
      adminId: adminId,
      isRead: false,
      userRoleId: "2",
    },
  });

  return data.length;
}
