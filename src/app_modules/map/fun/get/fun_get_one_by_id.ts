"use server";

import prisma from "@/app/lib/prisma";

export async function map_funGetOneById({ mapId }: { mapId: string }) {
  const data = await prisma.businessMaps.findFirst({
    where: {
      id: mapId,
    },
    select: {
      Author: {
        include: {
          Profile: true,
        },
      },
      id: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      namePin: true,
      latitude: true,
      longitude: true,
      authorId: true,
    },
  });

  return data;
}
