"use server";

import prisma from "@/app/lib/prisma";

export async function Portofolio_getOneById(portoId: string) {
    // console.log(id)
  const data = await prisma.portofolio.findUnique({
    where: {
      id: portoId,
    },
    select: {
      id: true,
      namaBisnis: true,
      alamatKantor: true,
      deskripsi: true,
      tlpn: true,
      active: true,
      profileId: true,
      Logo: true,
      logoId: true,
      masterBidangBisnisId: true,
      MasterBidangBisnis: {
        select: {
          id: true,
          name: true,
          active: true,
        },
      },
      Portofolio_MediaSosial: true,
      
      


    },
  });

  return data
}
