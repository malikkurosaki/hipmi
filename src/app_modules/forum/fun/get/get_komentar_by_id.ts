"use server";

import prisma from "@/app/lib/prisma";

export async function forum_getKomentarById(postingId: string) {
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
      authorId: true,
    },
  });

  return data;
}
