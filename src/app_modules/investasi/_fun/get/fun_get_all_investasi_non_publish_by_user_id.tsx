"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function investasi_funGetAllInvestasiNonPublishByUserId({
  page,
  statusId,
}: {
  page: number;
  statusId: string;
}) {
  const authorId = await user_funGetOneUserId();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: authorId,
      masterStatusInvestasiId: statusId,
    },
  });

  return data;
}
