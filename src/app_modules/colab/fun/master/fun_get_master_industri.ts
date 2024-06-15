"use server";

import prisma from "@/app/lib/prisma";

export default async function colab_funGetMasterIndustri() {
  const data = await prisma.projectCollaborationMaster_Industri.findMany({});
  return data;
}
