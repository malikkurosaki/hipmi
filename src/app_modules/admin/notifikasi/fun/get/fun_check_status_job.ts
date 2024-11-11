"use server";

import { prisma } from "@/app/lib";

export async function admin_funCheckStatusJob({ id }: { id: string }) {
  const data = await prisma.job.findUnique({
    where: {
      id: id,
    },
    select: {
      MasterStatus: true,
    },
  });

  if (data?.MasterStatus?.name === "Review") {
    return true;
  } else {
    return false;
  }
}
