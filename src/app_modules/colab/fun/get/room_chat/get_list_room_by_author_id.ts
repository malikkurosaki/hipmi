"use server";

import prisma from "@/app/lib/prisma";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { redirect } from "next/navigation";

export default async function colab_getListRoomChatByAuthorId({
  page,
}: {
  page: number;
}) {
  const authorId = await user_funGetOneUserId();
  if (!authorId) {
    redirect(RouterAuth.login);
    // return { status: 400, message: "Gagal mendapatkan authorId" };
  }
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const listRoom = await prisma.projectCollaboration_AnggotaRoomChat.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: authorId,
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
