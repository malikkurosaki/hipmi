"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function Job_getListAllArsipById() {
  const authorId = await User_getUserId();

  const get = await prisma.job.findMany({
    where: {
      authorId: authorId,
      isArsip: true,
    },
  });

  return get;
}
