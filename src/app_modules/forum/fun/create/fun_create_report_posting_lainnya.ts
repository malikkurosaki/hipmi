"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function forum_funCreateReportPostingLainnya(
  postingId: string,
  deskripsi: string
) {
  const authorId = await User_getUserId();
  const create = await prisma.forum_ReportPosting.create({
    data: {
      forum_PostingId: postingId,
      deskripsi: deskripsi,
      userId: authorId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambah report !" };
  return { status: 201, message: "Berhasil menambah report !" };
}
