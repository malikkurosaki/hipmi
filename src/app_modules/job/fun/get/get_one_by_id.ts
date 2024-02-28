"use server";

import prisma from "@/app/lib/prisma";

export async function Job_getOneById(jobId: any) {
  const get = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
  });

  return get;
}
