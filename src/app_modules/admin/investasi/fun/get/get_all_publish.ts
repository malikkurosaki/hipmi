"use server";

import prisma from "@/app/lib/prisma";
import { ceil } from "lodash";

export async function adminInvestasi_funGetAllPublish({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      countDown: "desc",
    },
    where: {
      active: true,
      masterStatusInvestasiId: "1",
      title: {
        contains: search,
        mode: "insensitive",
      },
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
      imagesId: true,
      catatan: true,
      MasterStatusInvestasi: true,
      BeritaInvestasi: true,
      DokumenInvestasi: true,
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
      author: true,
      progress: true,
      sisaLembar: true,
    },
  });

  const nCount = await prisma.investasi.count({
    where: {
      active: true,
      masterStatusInvestasiId: "1",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
