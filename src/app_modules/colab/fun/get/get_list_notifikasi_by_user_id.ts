"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListNotifikasiByUserId() {
  const authorId = await user_getOneUserId();

  const get = await prisma.projectCollaboration_Notifikasi.findMany({
    orderBy: {
        createdAt: "desc",
    },
    where: {
      userId: authorId,
    },
    select: {
      id:true,
      createdAt: true,
      isRead: true,
      note: true,
      ProjectCollaboration: {
        select: {
          id: true,
          report: true,
        },
      },
    },
  });

  return get;
}
