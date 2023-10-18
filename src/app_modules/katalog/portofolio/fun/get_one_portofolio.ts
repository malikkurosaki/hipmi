"use server";

import prisma from "@/app/lib/prisma";

export async function getOnePortofolio(id: string) {
    // console.log(id)
  const data = await prisma.katalog.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      namaBisnis: true,
      alamatKantor: true,
      deskripsi: true,
      tlpn: true,
      active: true,
      MasterBidangBisnis: {
        select: {
          id: true,
          name: true,
          active: true,
        },
      },
      profileId: true,
    },
  });

  return data
}
