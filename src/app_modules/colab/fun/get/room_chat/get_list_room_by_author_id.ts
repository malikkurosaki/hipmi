"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListRoomChatByAuthorId() {
  const userLoginId = await user_getOneUserId();

  const listRoom = await prisma.projectCollaboration_AnggotaRoomChat.findMany({
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
  // const get = await prisma.projectCollaboration_RoomChat.findMany({
  //   where: {
  //     userId: userLoginId,
  //     AND: [
  //       {
  //         ProjectCollaboration_AnggotaRoomChat: {
  //           every: {
  //             userId: userLoginId,
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     // isActive: true,
  //     // Author: true,
  //     // userId: true,
  //     // ProjectCollaboration: true,
  //     // projectCollaborationId: true,
  //     ProjectCollaboration_AnggotaRoomChat: {
  //       select: {
  //         userId: true,
  //         User: true,
  //       },
  //     },
  //   },
  // });
  // return get;
}
