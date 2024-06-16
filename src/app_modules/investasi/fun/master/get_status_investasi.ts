"use server";

import prisma from "@/app/lib/prisma";

export default async function getStatusInvestasi() {
  const data = await prisma.masterStatusInvestasi.findMany({
    select: {
      id: true,
      name: true,
      color: true,
    },
  });
  return data;
}
