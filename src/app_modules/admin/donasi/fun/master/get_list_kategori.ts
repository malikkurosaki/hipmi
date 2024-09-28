"use server";

import prisma from "@/app/lib/prisma";

export default async function adminDonasi_getMasterKategori() {
  const data = await prisma.donasiMaster_Kategori.findMany({
    orderBy: {
      createdAt: "asc",
    },

  });
  return data;
}
