"use server";
import prisma from "@/app/lib/prisma";

export async function investasi_funGetOneInvestasiById({
  investasiId,
}: {
  investasiId: string;
}) {
  const data = await prisma.investasi.findUnique({
    where: {
      id: investasiId,
    },
    include: {
      author: {
        include: {
          Profile: true,
        },
      },
      MasterStatusInvestasi: true,
      BeritaInvestasi: true,
      DokumenInvestasi: true,
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
      MasterProgresInvestasi: true,
    },
  });

  return data;
}
