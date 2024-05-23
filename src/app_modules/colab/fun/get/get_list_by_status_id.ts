"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListByStatusId(statusId: number) {
  const AuthorId = await user_getOneUserId();
  const data = await prisma.projectCollaboration.findMany({
    where: {
      userId: AuthorId,
      projectCollaborationMaster_StatusId: statusId,
    },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      Author: {
        select: {
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

  if (!data) return { status: 400, message: "Gagal Mengambil data" };

  return { data: data, status: 200, message: "Berhasil mengambil data" };
}
