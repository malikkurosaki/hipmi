"use server";
import prisma from "@/app/lib/prisma";
import { data } from "autoprefixer";

export default async function getOneInvestasiById(id: string) {
  const data = await prisma.investasi.findUnique({
    where: {
      id: id,
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
      catatan: true,
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
