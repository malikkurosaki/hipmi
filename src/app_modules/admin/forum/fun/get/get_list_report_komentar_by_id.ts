"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_getListReportKomentarbyId(komentarId: string) {
  const data = await prisma.forum_ReportKomentar.findMany({
    where: {
      forum_KomentarId: komentarId,
    },
    select: {
      id: true,
      isActive: true,
      createdAt: true,
      deskripsi: true,
      ForumMaster_KategoriReport: true,
      User: {
        select: {
          Profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return data;
}
