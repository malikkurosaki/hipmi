"use server";

import prisma from "@/app/lib/prisma";

export async function map_funGetOneById({ mapId }: { mapId: string }) {
  const data = await prisma.businessMaps.findFirst({
    where: {
      id: mapId,
    },
    select: {
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              id: true,
              imagesId: true,
            },
          },
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
      imagesId: true,
      Portofolio: {
        select: {
          id: true,
          alamatKantor: true,
          tlpn: true,
          deskripsi: true,
          namaBisnis: true,
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
