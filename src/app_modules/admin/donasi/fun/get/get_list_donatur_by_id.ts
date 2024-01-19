"use server";

import prisma from "@/app/lib/prisma";

export async function AdminDonasi_getListDonatur(donasiId: string) {
  // console.log(donasiId)
  const data = await prisma.donasi_Invoice.findMany({
    where: {
      donasiId: donasiId,
    },
    select: {
      id: true,
      nominal: true,
      createdAt: true,
      Author: true,
      DonasiMaster_StatusInvoice: true
    },
  });

//   console.log(data)

  return data;
}
