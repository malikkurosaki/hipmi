"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function donasi_funGetAllStatusPublish({ page }: { page: number }) {
  const authorId = await user_getOneUserId();
  const takeData = 5;
  const skipData = page * takeData - takeData;


  const data = await prisma.donasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      publishTime: "desc",
    },
    where: {
      authorId: authorId,
      donasiMaster_StatusDonasiId: "1",
      active: true,
    },
    select: {
      id: true,
      title: true,
      imagesId: true,
      target: true,
      progres: true,
      publishTime: true,
      DonasiMaster_Durasi: true,
      terkumpul: true,
    },
  });
  return data;
}
