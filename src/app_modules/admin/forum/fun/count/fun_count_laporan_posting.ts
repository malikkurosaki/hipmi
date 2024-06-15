"use server";

import prisma from "@/app/lib/prisma";

export async function adminForum_countLaporanPosting() {
  const count = await prisma.forum_ReportPosting.count({
    where: {
      isActive: true,
    },
  });

  return count;
}
