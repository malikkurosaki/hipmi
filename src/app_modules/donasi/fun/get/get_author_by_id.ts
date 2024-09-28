"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getAuthorById(authorId: string) {
  //   console.log(authorId);
  const data = await prisma.user.findFirst({
    where: {
      id: authorId,
    },
    select: {
      id: true,
      username: true,
      nomor: true,
      Profile: {
        select: {
          id: true,
          name: true,
          email: true,
          imagesId: true,
        },
      },
      Donasi: {
        where: {
          donasiMaster_StatusDonasiId: "1",
        },
        select: {
          id: true,
          title: true,
          target: true,
          active: true,
          createdAt: true,
          updatedAt: true,
          publishTime: true,
          catatan: true,
          authorId: true,
          progres: true,
          terkumpul: true,
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
      },
    },
  });

  return data;
}
