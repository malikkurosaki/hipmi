"use server";

import prisma from "@/app/lib/prisma";

export default async function getPeriodeDeviden() {
  const data = await prisma.masterPeriodeDeviden.findMany({
    select: {
      id: true,
      name: true,
      active: true,
    },
  });

  return data;
}
