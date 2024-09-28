"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getListDonatur(donasiId: string) {
  const data = await prisma.donasi_Invoice.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
      donasiMaster_StatusInvoiceId: "1",
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      nominal: true,
      DonasiMaster_StatusInvoice: true,
      donasiMaster_StatusInvoiceId: true,
      Author: true,
      Donasi: {
        select: {
          id: true,
          title: true,
          target: true,
          progres: true,
          authorId: true,
          imagesId: true,
          publishTime: true,
          donasiMaster_KategoriId: true,
          donasiMaster_DurasiId: true,
          donasiMaster_StatusDonasiId: true,
          imageDonasi: true,
          DonasiMaster_Ketegori: true,
          DonasiMaster_Durasi: true,
          DonasiMaster_Status: true,
        },
      },
    },
  });

  return data;
}
