"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function job_getAllStatusReject({
  page,
}: {
  page: number;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const authorId = await user_funGetOneUserId();
  const data = await prisma.job.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "4",
      authorId: authorId,
      isActive: true,
    },
  });

  return data;
}
