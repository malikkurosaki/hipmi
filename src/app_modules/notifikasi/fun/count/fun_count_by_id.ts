"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function notifikasi_countUserNotifikasi() {
  const userLoginId = await funGetUserIdByToken();

  const count = await prisma.notifikasi.findMany({
    where: {
      userId: userLoginId,
      isRead: false,
      userRoleId: "1",
    },
  });

  return count.length;
}
