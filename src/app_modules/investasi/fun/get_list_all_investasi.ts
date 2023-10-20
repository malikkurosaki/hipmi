"use server";

import prisma from "@/app/lib/prisma";

export async function getListAllInvestasi() {
  const data = await prisma.investasi.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return data;
}
