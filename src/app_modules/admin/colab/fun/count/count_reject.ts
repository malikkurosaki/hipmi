"use server";

import prisma from "@/app/lib/prisma";

export default async function adminColab_countIsReject() {
  const count = await prisma.projectCollaboration.count({
    where: {
      isReject: true,
    },
  });

  return count;
}
