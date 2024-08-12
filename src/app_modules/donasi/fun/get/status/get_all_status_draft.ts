"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function donasi_funGetAllStatusDraft({ page }: { page: number }) {
  const authorId = await user_getOneUserId();
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.donasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: authorId,
      donasiMaster_StatusDonasiId: "3",
    },
  });
  
  return data;
}
