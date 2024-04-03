"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_getListReportPostingById(postingId: string) {
  const data = await prisma.forum_ReportPosting.findMany({
    where: {
      forum_PostingId: postingId,
    },
    select: {
      id: true,
      deskripsi: true,
      createdAt: true,
      User: {
        select: {
          Profile: {
            select: {
              name: true,
            },
          },
        },
      },
      ForumMaster_KategoriReport: {
        select: {
          id: true,
          title: true,
          deskripsi: true,
        },
      },
    },
  });

  return data;
}
