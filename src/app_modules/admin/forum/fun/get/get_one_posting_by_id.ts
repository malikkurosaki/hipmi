"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_getOnePostingById(postingId: string) {
  const data = await prisma.forum_Posting.findFirst({
    where: {
      id: postingId,
    },
    select: {
      id: true,
      diskusi: true,
      Author: {
        select: {
          Profile: {
            select: {
              name: true
            },
          },
        },
      },
    },
  });

//   console.log(data);

  return data;
}
