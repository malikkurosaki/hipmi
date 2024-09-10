"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function job_getAllListPublish({
  page,
  search,
}: {
  page: any;
  search?: string;
}) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.job.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "1",
      isActive: true,
      isArsip: false,
      title: {
        mode: "insensitive",
        contains: search,
      },
    },
    select: {
      id: true,
      title: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: true,
        },
      },
    },
  });

  return data;
}
