"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { NextRequest } from "next/server";

export default async function adminNotifikasi_getByUserId() {
  const adminId = await user_getOneUserId();

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
      adminId: adminId,
      userRoleId: "2",
    },
  });
  return data;
}
