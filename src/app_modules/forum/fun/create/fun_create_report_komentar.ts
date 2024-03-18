"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function forum_funCreateReportKomentar(
  komentarId: string,
  value: string
) {
  const authorId = await User_getUserId();

  const cekId = await prisma.forumMaster_KategoriReport.findFirst({
    where: {
      title: value,
    },
  });

  const createReport = await prisma.forum_ReportKomentar.create({
    data: {
      userId: authorId,
      forumMaster_KategoriReportId: cekId?.id,
      forum_KomentarId: komentarId,
    },
  });

  if (!createReport)
    return { status: 400, message: "Gagal menambahkan report komentar !" };
  return { status: 201, message: "Berhasil me-report komentar !" };
}
