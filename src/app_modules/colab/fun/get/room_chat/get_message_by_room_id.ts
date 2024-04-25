"use server";

import prisma from "@/app/lib/prisma";

export default async function colab_getMessageByRoomId(roomId: string) {
  const getList = await prisma.projectCollaboration_Message.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      projectCollaboration_RoomChatId: roomId,
    },
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      message: true,
      isFile: true,
      User: {
        select: {
          id: true,
          Profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return getList;
}
