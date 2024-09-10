"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function job_getAllArsipById({page}: {page: number}) {
  
  const authorId = await user_funGetOneUserId();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const get = await prisma.job.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: authorId,
      isArsip: true,
      isActive: true,
    },
  });

  return get;
}
