"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_funCreateMessageByUserId(
  message: string,
  roomId: string
) {
  const userLoginId = await user_getOneUserId();
  const msg = await prisma.projectCollaboration_Message.create({
    data: {
      userId: userLoginId,
      message: message,
      projectCollaboration_RoomChatId: roomId,
    },
  });

  if (!msg) return { status: 400, message: "Pesan Gagal Dikirim" };
  return { status: 200, message: "Pesan Berhasil Dikirim" };
}
