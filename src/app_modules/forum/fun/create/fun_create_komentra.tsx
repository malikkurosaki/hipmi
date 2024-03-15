"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function forum_funCreateKomentar(
  postingId: string,
  komentar: string
) {
  const authorId = await User_getUserId();

  const create = await prisma.forum_Komentar.create({
    data: {
      komentar: komentar,
      forum_PostingId: postingId,
      authorId: authorId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan komentar" };
  revalidatePath("/dev/forum/detail");
  return { status: 201, message: "Berhasil menambahkan komentar" };
}
