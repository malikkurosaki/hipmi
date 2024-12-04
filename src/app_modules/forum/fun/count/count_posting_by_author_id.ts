"use server";

import prisma from "@/app/lib/prisma";

export async function forum_countPostingByAuthorId(authorId: string) {
  const data = await prisma.forum_Posting.count({
    where: {
      authorId: authorId,
      isActive: true,
    },
  });

  return data;
}
