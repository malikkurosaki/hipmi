"use server";

import prisma from "@/app/lib/prisma";

export async function AdminDonasi_funCountDonatur(donasiId: string) {
  const donatur = await prisma.donasi_Invoice.count({
   where: {
    donasiId: donasiId
   }
  });

  return donatur;
}
