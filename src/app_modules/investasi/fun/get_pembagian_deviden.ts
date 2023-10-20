"use server";

import prisma from "@/app/lib/prisma";

export default async function getPembagianDeviden() {
  const data = await prisma.masterPembagianDeviden.findMany({
    select: {
      id: true,
      name: true,
      active: true,
    },
  });

  return data;
}
