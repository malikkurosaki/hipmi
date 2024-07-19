"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function forum_funCreateReportKomentar({
  komentarId,
  kategoriId,
}: {
  komentarId: string;
  kategoriId: any;
}) {
  const authorId = await user_getOneUserId();
  // console.log(kategoriId);

  // const cekId = await prisma.forumMaster_KategoriReport.findFirst({
  //   where: {
  //     title: kategoriId,
  //   },
  // });

  try {
    const createReport = await prisma.forum_ReportKomentar.create({
      data: {
        userId: authorId,
        forumMaster_KategoriReportId: kategoriId,
        forum_KomentarId: komentarId,
      },
    });

    if (!createReport)
      return { status: 400, message: "Gagal menambahkan report komentar !" };
  } catch (error) {
    console.log(error);
  }

  return { status: 201, message: "Berhasil me-report komentar !" };
}
