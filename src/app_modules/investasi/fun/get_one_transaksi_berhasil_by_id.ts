"use server";

import prisma from "@/app/lib/prisma";

export default async function getOneTransaksiBerhasilByIdInvestasi(
  idTransaksi: string
) {
  const data = await prisma.transaksiInvestasi.findUnique({
    
    where: {
      id: idTransaksi,
    },
    select: {
      Investasi: {
        select: {

          author: true,
          BeritaInvestasi: true,
          DokumenInvestasi: true,
          ProspektusInvestasi: true,
          MasterPembagianDeviden: true,
          MasterPencarianInvestor: true,
          MasterPeriodeDeviden: true,
          id: true,
          title: true,
          countDown: true,
          imagesId: true,
          roi: true,
          targetDana: true,
          totalLembar: true,
          sisaLembar: true,
          hargaLembar: true,
        },
      },
      id: true,
      gross_amount: true,
      quantity: true,
    },
  });

  return data;
}
