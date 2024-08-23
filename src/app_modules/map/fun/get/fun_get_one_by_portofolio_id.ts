"use server";

import prisma from "@/app/lib/prisma";

export async function map_funGetOneBusinessMapByPortofolioId({
  portofolioId,
}: {
  portofolioId: string;
}) {
  const res = await prisma.businessMaps.findFirst({
    where: {
      portofolioId: portofolioId,
    },
    include: {
      ImageMap: true,
      ImagePin: true,
      Portofolio: {
        select: {
          id: true,
          Logo: true,
          logoId: true
        }
      }
    }
  });

  return res;
}
