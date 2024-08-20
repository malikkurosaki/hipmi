"use server";

import prisma from "@/app/lib/prisma";

export async function funGlobal_getAllBank() {
  const data = await prisma.masterBank.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      active: true,
    },
  });
  return data;
}
