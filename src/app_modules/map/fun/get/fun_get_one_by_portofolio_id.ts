"use server";

import prisma from "@/app/lib/prisma";

export async function map_funGetOneByPortofolioId({
  portofolioId,
}: {
  portofolioId: string;
}) {
  const res = await prisma.businessMaps.findFirst({
    where: {
      portofolioId: portofolioId,
    },
    select: {
      id: true,
      namePin: true,
      latitude: true,
      longitude: true,
      imagesId: true,
    },
  });

  return res;
}
