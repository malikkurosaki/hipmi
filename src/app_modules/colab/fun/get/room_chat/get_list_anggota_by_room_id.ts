"use server";

import prisma from "@/app/lib/prisma";

export default async function colab_getListAnggotaByRoomId(roomId: string) {
  const get = await prisma.projectCollaboration_RoomChat.findMany({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      ProjectCollaboration: true,
      ProjectCollaboration_AnggotaRoomChat: {
        select: {
          User: {
            select: {
              Profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return get;
}
