"use server";

import prisma from "@/app/lib/prisma";

export default async function colab_getListPartisipanById(colabId: string) {
  const data = await prisma.projectCollaboration_Partisipasi.findMany({
    where: {
      projectCollaborationId: colabId,
    },
    select: {
      id: true,
      User: {
        select: {
          id: true,
          Profile: true,
        },
      },
    },
  });

  return data
}
