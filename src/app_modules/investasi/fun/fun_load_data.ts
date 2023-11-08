"use server";

import prisma from "@/app/lib/prisma";

export default async function funLoadDataInvestasi(id: string) {
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
          imagesId: true,
          MasterStatusInvestasi: true,
          BeritaInvestasi: true,
          DokumenInvestasi: true,
          ProspektusInvestasi: true,
          MasterPembagianDeviden: true,
          MasterPencarianInvestor: true,
          MasterPeriodeDeviden: true,
          SahamTerbeli: true,
        },
      });
    
      return data;
}
