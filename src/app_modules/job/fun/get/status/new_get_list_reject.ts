"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function job_getListReject({}: {}) {
  const userId = await user_getOneUserId();
  const data = await prisma.job.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "2",
      authorId: userId,
      isActive: true,
    },
  });

  return data;
}
