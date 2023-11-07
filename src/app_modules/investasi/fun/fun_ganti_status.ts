"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function funGantiStatusInvestasi(id: string, val: string) {
  const data = await prisma.investasi.update({
    where: {
      id: id,
    },
    data: {
      masterStatusInvestasiId: val,
    },
  });

  if(!data) return {status: 400}

  revalidatePath("/dev/investasi/main/portofolio")

  return {
    status: 200
  }
}
