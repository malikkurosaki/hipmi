"use server";

import prisma from "@/app/lib/prisma";

export async function job_getTwoForHomeView() {
  const get = await prisma.job.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
    },
    select: {
      id: true,
      Author: {
        select: {
          id: true,
          username: true,
        },
      },
      title: true,
      deskripsi: true
    },
  });

  return get;
}
