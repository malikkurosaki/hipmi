"use server";

import prisma from "@/app/lib/prisma";

export async function Portofolio_geOnetMedsosById(portoId: string) {
  const data = await prisma.portofolio_MediaSosial.findFirst({
    where: {
      portofolioId: portoId,
    },
  });
  
  return data;
}
