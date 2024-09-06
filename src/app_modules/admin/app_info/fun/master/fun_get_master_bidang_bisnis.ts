"use server";

import prisma from "@/app/lib/prisma";

export async function adminAppInformation_funGetBidangBisnis() {
  const data = await prisma.masterBidangBisnis.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
