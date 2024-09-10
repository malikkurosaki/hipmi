"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function forum_funCreate(value: string) {
  const AuthorId = await user_funGetOneUserId();

  const create = await prisma.forum_Posting.create({
    data: {
      diskusi: value,
      authorId: AuthorId,
      forumMaster_StatusPostingId: 1
    },
  });

  if (!create) return { status: 400, message: "Gagal  memposting" };
  revalidatePath("/dev/forum/main");
  return { status: 201, message: "Berhasil memposting" };
}
