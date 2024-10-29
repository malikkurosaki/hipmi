"use server";

import { prisma } from "@/app/lib";

export async function job_funGetMasterStatus() {
  const data = await prisma.masterStatus.findMany({});

  return data
}
