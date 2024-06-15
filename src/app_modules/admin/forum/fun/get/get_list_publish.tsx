"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_getListPublish() {
  const data = await prisma.forum_Posting.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
    },
    select: {
      id: true,
      diskusi: true,
      isActive: true,
      createdAt: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: true,
        },
      },
      Forum_ReportPosting: true,
      Forum_Komentar: {
        where: {
          isActive: true
        }
      },
      ForumMaster_StatusPosting: true
    },
  });

  return data;
}
