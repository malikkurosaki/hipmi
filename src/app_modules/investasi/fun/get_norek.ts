"use server";

import prisma from "@/app/lib/prisma";

export default async function getNorekInvestasi(id: string) {
  const res = await prisma.masterBank.findUnique({
    where: { id: id },
    select: {
      name: true,
      norek: true,
    },
  });

  if(!res) return {status: 400, message: "Nomor rekeneing tidak tersedia"}

  return {
    res,
    status: 200,
    message: "Berhasil"
  }
}
