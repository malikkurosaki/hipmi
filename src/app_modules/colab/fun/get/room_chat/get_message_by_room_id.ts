"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export default async function colab_getMessageByRoomId(
  roomId: string,
  page: number
) {
  // console.log(page)
  const lewat = page * 5 - 5;
  const ambil = 5;
  const getList = await prisma.projectCollaboration_Message.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: lewat,
    take: ambil,
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

  const dataRevers = _.reverse(getList);

  return getList;
}
