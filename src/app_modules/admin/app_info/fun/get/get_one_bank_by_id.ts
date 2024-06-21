"use server";

import prisma from "@/app/lib/prisma";

export default async function adminAppInformation_getOneBankById({
  id,
}: {
  id: string;
}) {
  const data = await prisma.masterBank.findFirst({
    where: {
      id: id,
    },
  });

  return data;
}
