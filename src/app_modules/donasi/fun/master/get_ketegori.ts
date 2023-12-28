"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getMasterKategori() {
  const data = await prisma.donasiMaster_Kategori.findMany({});
  return data;
}
