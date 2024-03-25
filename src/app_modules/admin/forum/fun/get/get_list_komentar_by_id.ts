"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_getListKomentarById(postingId: string) {
  const data = await prisma.forum_Komentar.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      forum_PostingId: postingId,
      isActive: true,
    },
    select: {
      id: true,
      isActive: true,
      komentar: true,
      createdAt: true,
      authorId: true,
      Author: {
        select: {
          id: true,
          Profile: {
            select: {
              name: true,
              imagesId: true,
            },
          },
        },
      },
      Forum_ReportKomentar: true
    },
  });

  return data;
}
