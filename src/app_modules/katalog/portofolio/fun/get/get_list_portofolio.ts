"use server";

import prisma from "@/app/lib/prisma";

export async function funGetListPortofolio(profileId: any) {
  const data = await prisma.portofolio.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      profileId: profileId,
      active: true
    },
    select: {
      id: true,
      namaBisnis: true,
      profileId: true
    },
  });

  return data
}
