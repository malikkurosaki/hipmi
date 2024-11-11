"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function adminNotifikasi_getByUserId() {
  const userLoginId = await funGetUserIdByToken();

  const data = await prisma.notifikasi.findMany({
    orderBy: [
      {
        isRead: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
    where: {
      adminId: userLoginId,
      userRoleId: "2",
    },
  });
  
  return data;
}
