"use server";

import prisma from "@/app/lib/prisma";

export async function adminMap_funGetAllMaps() {
  const data = await prisma.businessMaps.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
    },
  });

  return data;
}
