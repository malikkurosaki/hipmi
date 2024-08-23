"use server";

import prisma from "@/app/lib/prisma";

export async function map_funGetAllMap() {
  const data = await prisma.businessMaps.findMany({
    where: {
      isActive: true,
    },
    include: {
      Portofolio: {
        select: {
          logoId: true,
        },
      },
    },
  });

  return data;
}
