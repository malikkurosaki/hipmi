"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListAllProyekSayaByAuthorId() {
  const AuthorId = await user_getOneUserId();
  const get = await prisma.projectCollaboration.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: AuthorId, isActive: true },
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

  if (!get) return { status: 400, message: "Gagal mengambil data" };
  return { data: get, status: 200, message: "Berhasil mengambil data" };
}
