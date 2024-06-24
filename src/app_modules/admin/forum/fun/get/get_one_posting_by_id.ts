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
      ForumMaster_StatusPosting: {
        select: {
          id: true,
          status: true,
        },
      },
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  //   console.log(data);

  return data;
}
