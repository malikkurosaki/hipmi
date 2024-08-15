"use server";

import prisma from "@/app/lib/prisma";
import moment from "moment";

export async function investasi_funGetAllPublish() {
  const data = await prisma.investasi.findMany({
    where: {
      masterStatusInvestasiId: "1",
      masterProgresInvestasiId: "1",
    },
    select: {
      id: true,
      MasterPencarianInvestor: true,
      countDown: true,
      progress: true,
    },
  });

  for (let a of data) {
    if (
      (a.MasterPencarianInvestor?.name as any) -
        moment(new Date()).diff(new Date(a.countDown as any), "days") <=
      0
    ) {
      // console.log(a.MasterPencarianInvestor?.name);

      await prisma.investasi.update({
        where: {
          id: a.id,
        },
        data: {
          masterProgresInvestasiId: "3",
        },
      });
    }

    if (a.progress === "100") {
      await prisma.investasi.update({
        where: {
          id: a.id,
        },
        data: {
          masterProgresInvestasiId: "2",
        },
      });
    }
  }

  // cek data yang lewat
  // klo ada,  update status

  const dataFix = await prisma.investasi.findMany({
    orderBy: [
      {
        masterProgresInvestasiId: "asc",
      },
    ],
    where: {
      masterStatusInvestasiId: "1",
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

  return dataFix;
}
