"use server";

import prisma from "@/app/lib/prisma";

export default async function getAllDataPublishInvestasi() {
  const data = await prisma.investasi.findMany({
    orderBy: [
      {
        masterProgresInvestasiId: "asc",
      },
      {
        countDown: "desc",
      },
    ],
    where: {
      MasterStatusInvestasi: {
        name: {
          equals: "Publish",
        },
      },
    },
    select: {
      id: true,
      title: true,
        authorId: true,
        hargaLembar: true,
        targetDana: true,
        totalLembar: true,
        sisaLembar: true,
        progress: true,
        roi: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        imagesId: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
      MasterProgresInvestasi: true,
      countDown: true,
    },
  });
  return data;
}
