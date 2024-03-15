"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function forum_countPostingByAuthorId(authorId: string) {


  const data = await prisma.forum_Posting.count({
    where: {
      authorId: authorId,
      isActive: true
    },
  });

  return data
}
