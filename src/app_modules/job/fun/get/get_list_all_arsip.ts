"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function Job_getListAllArsipById() {
  const authorId = await user_getOneUserId();

  const get = await prisma.job.findMany({
    where: {
      authorId: authorId,
      isArsip: true,
    },
  });

  return get;
}
