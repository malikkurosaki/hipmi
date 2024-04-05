"use server";

import prisma from "@/app/lib/prisma";

export default async function colab_getListAllProyek() {
  const data = await prisma.projectCollaboration.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      projectCollaborationMaster_StatusId: 1,
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
