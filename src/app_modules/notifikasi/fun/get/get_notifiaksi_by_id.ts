"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function notifikasi_getByUserId({page}: {page: number }) {
  const userId = await user_getOneUserId();
   const takeData = 10;
   const skipData = page * takeData - takeData;

  const data = await prisma.notifikasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      isRead: "asc"
    },
    where: {
      userId: userId,
      userRoleId: "1",
    },
  });

  return data;
}
