"use server";

import prisma from "@/app/lib/prisma";

export async function AdminDonasi_getById(id: string) {
  const res = await prisma.donasi.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      target: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      publishTime: true,
      authorId: true,
      imagesId: true,
      donasiMaster_KategoriId: true,
      donasiMaster_DurasiId: true,
      donasiMaster_StatusDonasiId: true,
      Author: true,
      imageDonasi: true,
      CeritaDonasi: true,
      DonasiMaster_Ketegori: true,
      DonasiMaster_Durasi: true,
      DonasiMaster_Status: true,
    },
  });
  return res;
}
