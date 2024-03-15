"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function forum_funCreate(value: string) {
  const AuthorId = await User_getUserId();

  const create = await prisma.forum_Posting.create({
    data: {
      diskusi: value,
      authorId: AuthorId,
    },
  });

  if (!create) return { status: 400, message: "Gagal  menambahkan postingan" };
  revalidatePath("/dev/forum/main");
  return { status: 201, message: "Berhasil menambahkan  postingan" };
}
