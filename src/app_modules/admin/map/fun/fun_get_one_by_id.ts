"use server";

import prisma from "@/app/lib/prisma";

export async function adminMap_funGetOneById({ mapId }: { mapId: string }) {
  const data = await prisma.businessMaps.findFirst({
    where: {
      id: mapId,
    },
    include: {
      Author: true,
      Images: true,
      Portofolio: {
        include: {
          MasterBidangBisnis: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return data;
}
