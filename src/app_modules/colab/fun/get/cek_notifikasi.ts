"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_CekNotifikasi() {
  const authorId = await user_funGetOneUserId();

  const cekNotif = await prisma.projectCollaboration_Notifikasi.findMany({
    where: {
      userId: authorId,
      isRead: false,
    },
    select: {
      isRead: true,
    },
  });

  if (cekNotif.length > 0) {
    return true;
  } else {
    return false;
  }
}
