"use server";

import prisma from "@/app/lib/prisma";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { redirect } from "next/navigation";

export default async function colab_getListNotifikasiByUserId() {
  const authorId = await user_funGetOneUserId();
   if (!authorId) {
     redirect(RouterAuth.login);
     // return { status: 400, message: "Gagal mendapatkan authorId" };
   }

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
