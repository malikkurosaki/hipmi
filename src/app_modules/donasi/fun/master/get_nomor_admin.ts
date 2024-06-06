"use server";

import prisma from "@/app/lib/prisma";

export default async function donasi_getMasterNomorAdmin() {
  const get = await prisma.nomorAdmin.findFirst({
    where: {
      isActive: true,
    },
  });
  return get;
}
