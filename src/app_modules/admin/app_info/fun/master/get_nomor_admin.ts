"use server";

import prisma from "@/app/lib/prisma";

export default async function adminAppInformation_getNomorAdmin() {
  const data = await prisma.nomorAdmin.findFirst({
    where: {
      isActive: true,
    },
  });

  return data;
}
