"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";

export default async function adminNotifikasi_funCreateToUser({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  const adminId = await user_funGetOneUserId();

  const create = await prisma.notifikasi.create({
    data: {
      adminId: adminId,
      userId: data.userId,
      appId: data.appId,
      status: data.status,
      title: data.title,
      pesan: data.pesan,
      kategoriApp: data.kategoriApp,
      userRoleId: "1",
    },
  });

  return { status: 201, message: "Berhasil mengirim notifikasi" };
}
