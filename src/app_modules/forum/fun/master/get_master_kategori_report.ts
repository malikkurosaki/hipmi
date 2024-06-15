"use server";

import prisma from "@/app/lib/prisma";

export async function forum_getMasterKategoriReport() {
  const data = await prisma.forumMaster_KategoriReport.findMany({});

  const changeType = JSON.stringify(data, null,2)

  return data;
}
