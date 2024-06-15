"use server";

import prisma from "@/app/lib/prisma";

export default async function adminAppInformation_getMasterBank() {
  const data = await prisma.masterBank.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
