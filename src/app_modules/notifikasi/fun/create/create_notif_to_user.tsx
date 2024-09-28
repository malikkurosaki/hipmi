"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export default async function notifikasiToUser_funCreate({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  const created = await prisma.notifikasi.create({
    data: {
      userId: data.userId,
      appId: data.appId,
      status: data.status,
      title: data.title,
      pesan: data.pesan,
      kategoriApp: data.kategoriApp,
      userRoleId: "1",
    },
  });
  if (!created) return { status: 400, message: "Gagal mengirim notifikasi" };
  return { status: 201, message: "Berhasil mengirim notifikasi" };
}
