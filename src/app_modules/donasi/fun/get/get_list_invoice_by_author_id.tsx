"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getInvoiceByAuthorId(authorId: string) {
  // console.log(authorId)
  const data = await prisma.donasi_Invoice.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      authorId: authorId,
    },
    select: {
      id: true,
      nominal: true,
      DonasiMaster_StatusInvoice: true,
      donasiMaster_StatusInvoiceId: true,
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
