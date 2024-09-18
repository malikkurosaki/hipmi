"use server";

import prisma from "@/app/lib/prisma";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { redirect } from "next/navigation";

export default async function colab_CekNotifikasi() {
  const authorId = await user_funGetOneUserId();
  if (!authorId) {
    redirect(RouterAuth.login);
    // return { status: 400, message: "Gagal mendapatkan authorId" };
  }

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
