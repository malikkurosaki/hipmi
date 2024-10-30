"use server";

import { prisma } from "@/app/lib";

export async function donasi_funMasterStatusDonasi() {
  const data = await prisma.donasiMaster_StatusDonasi.findMany({});

  return data;
}
