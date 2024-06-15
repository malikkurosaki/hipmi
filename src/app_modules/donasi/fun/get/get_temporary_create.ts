"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getTemporaryCreate(id: string) {
  const data = await prisma.donasi_TemporaryCreate.findFirst({
    where: {
      id: id,
    },
  });
  return data;
}
