"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function forum_funCreateReportPosting({
  postingId,
  kategoriId,
}: {
  postingId: string;
  kategoriId: number;
}) {
  const authorId = await user_getOneUserId();

  const createReport = await prisma.forum_ReportPosting.create({
    data: {
      userId: authorId,
      forum_PostingId: postingId,
      forumMaster_KategoriReportId: kategoriId,
    },
  });

  if (!createReport)
    return { status: 400, message: "Gagal menambahkan report posting!" };
  return { status: 201, message: "Berhasil me-report posting!" };
}
