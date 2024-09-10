"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function event_funGetAllStatusPublish({ page }: { page: number }) {
  const authorId = await user_funGetOneUserId();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      active: true,
      eventMaster_StatusId: "1",
      authorId: authorId,
      tanggal: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      deskripsi: true,
      tanggal: true,
    },
  });

  return data;
}
