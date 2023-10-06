"use server";

import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";

/**
 * 
 * @param id - profileId
 * @returns list portofolio by Id
 */
export default async function getListPortofolio(id: string) {
  myConsole(id);
  

  const data = await prisma.katalog.findMany({
    where: {
      profileId: id,
    },
    select: {
      id: true,
      namaBisnis: true,
      alamatKantor: true,
      tlpn: true,
      deskripssi: true,
      active: true,
      masterBidangBisnisId: true,
    },
  });
  
  if (!data) {
    throw new Error('Failed to fetch data')
  }

  return data;
}
