"use server";

import prisma from "@/app/lib/prisma";

export default async function colab_getListAllProyek() {
  const data = await prisma.projectCollaboration.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      projectCollaborationMaster_StatusId: 1,
      isActive: true,
    },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      Author: {
        select: {
          id: true,
          Profile: true,
        },
      },
      ProjectCollaborationMaster_Industri: true,
      ProjectCollaboration_Partisipasi: {
        where: {
          isActive: true,
        },
      },
    },
  });

  return data;
}
