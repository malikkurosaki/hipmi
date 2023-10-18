"use server";

import prisma from "@/app/lib/prisma";

export async function funGetListPortofolio(profileId: any) {
  const data = await prisma.katalog.findMany({
    where: {
      profileId: profileId,
    },
    select: {
      id: true,
      namaBisnis: true,
      alamatKantor: true,
      tlpn: true,
      deskripsi: true,
      masterBidangBisnisId: true,
      active: true,
      profileId: true
    },
  });

  return data
}
