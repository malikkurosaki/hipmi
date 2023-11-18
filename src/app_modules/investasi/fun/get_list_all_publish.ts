"use server";

import prisma from "@/app/lib/prisma";

export async function getListAllPublish() {
  const data = await prisma.investasi.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      MasterStatusInvestasi: {
        name: {
          equals: "Publish",
        },
      },
      AND: {
        active: true
      }
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      hargaLembar: true,
      targetDana: true,
      totalLembar: true,
      roi: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      imagesId: true,
      MasterStatusInvestasi: true,
      BeritaInvestasi: true,
      DokumenInvestasi: true,
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
     
    },
  });

  return data;
}
