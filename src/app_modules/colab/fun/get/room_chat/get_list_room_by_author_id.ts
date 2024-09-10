"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListRoomChatByAuthorId({page}: {page: number}) {
  const userLoginId = await user_funGetOneUserId();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const listRoom = await prisma.projectCollaboration_AnggotaRoomChat.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userLoginId,
    },
    select: {
      ProjectCollaboration_RoomChat: {
        select: {
          id: true,
          name: true,
          isActive: true,
          ProjectCollaboration_AnggotaRoomChat: {
            select: {
              User: true,
            },
          },
        },
      },
    },
  });

  // console.log(listRoom);

  return listRoom;

}
