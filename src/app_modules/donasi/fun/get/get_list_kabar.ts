"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getListKabar(donasiId: string) {
  // console.log(donasiId)
  const data = await prisma.donasi_Kabar.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
    },
    select: {
      id: true,
      title: true,
      deskripsi: true,
      createdAt: true,
    },
  });
  return data;
}
