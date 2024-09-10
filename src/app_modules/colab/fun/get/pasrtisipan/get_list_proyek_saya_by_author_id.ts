"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListAllProyekSayaByAuthorId({
  page,
}: {
  page: number;
}) {
  const authorId = await user_funGetOneUserId();

  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.projectCollaboration.findMany({
    take: takeData,
    skip: skipData,
    orderBy: { createdAt: "desc" },
    where: { userId: authorId, isActive: true },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      // jumlah_partisipan: true,
      Author: {
        select: {
          id: true,
          Profile: true,
        },
      },
      ProjectCollaborationMaster_Industri: true,
      ProjectCollaboration_Partisipasi: {
        where: {
          isActive: true,
        },
      },
    },
  });

  return data;
}
