"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function forum_funCreateReportKomentarLainnya(
  komentarId: string,
  deskripsi: string
) {
  const authorId = await user_getOneUserId();
  const create = await prisma.forum_ReportKomentar.create({
    data: {
      forum_KomentarId: komentarId,
      deskripsi: deskripsi,
      userId: authorId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambah report !" };
  return { status: 201, message: "Berhasil menambah report !" };
}
