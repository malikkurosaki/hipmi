"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_countLaporanKomentar() {
  const count = await prisma.forum_ReportKomentar.count({
    where: {
      isActive: true,
      Forum_Komentar: {
        isActive: true,
      },
    },
  });

  return count;
}
