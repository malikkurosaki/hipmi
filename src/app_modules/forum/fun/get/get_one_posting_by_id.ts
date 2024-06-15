"use server";

import prisma from "@/app/lib/prisma";

export async function forum_getOnePostingById(postingId: string) {
  const data = await prisma.forum_Posting.findFirst({
    where: {
      id: postingId,
    },
    select: {
      id: true,
      diskusi: true,
      isActive: true,
      createdAt: true,
      authorId: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: true,
        },
      },
      _count: {
        select: {
          Forum_Komentar: true,
        },
      },
      ForumMaster_StatusPosting: true
    
    },
  });

  return data;
}
