"use server";

import prisma from "@/app/lib/prisma";

export async function funGetListPortofolio(profileId: any) {
  const data = await prisma.portofolio.findMany({
    where: {
      profileId: profileId,
    },
    select: {
      id: true,
      namaBisnis: true,
      profileId: true
    },
  });

  return data
}
