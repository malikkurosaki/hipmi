"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_funCreateRoomChat(
  nameRoom: string,
  value: any[],
  colabId: string
) {
  const authorId = await user_getOneUserId();

  const createRoom = await prisma.projectCollaboration_RoomChat.create({
    data: {
      name: nameRoom,
      userId: authorId,
      projectCollaborationId: colabId,
    },
  });

  if (!createRoom) return { status: 400, message: "Gagal Membuat Room" };

  for (let v of value) {
    // console.log(v);
    const createAnggota =
      await prisma.projectCollaboration_AnggotaRoomChat.create({
        data: {
          userId: v,
          projectCollaboration_RoomChatId: createRoom.id,
        },
      });

    if (!createAnggota)
      return { status: 400, message: "Gagal Menambah Anggota" };

    const createdNotifikasi = await prisma.notifikasi.create({
      data: {
        userId: v,
        appId: createRoom.id,
        status: "Collaboration Group",
        title: "Grup Kolaborasi Baru",
        pesan: createRoom.name,
        kategoriApp: "COLLABORATION",
        userRoleId: "1",
      },
    });
    if (!createdNotifikasi)
      return { status: 400, message: "Gagal mengirim notifikasi" };
  }

  const createForAuthor =
    await prisma.projectCollaboration_AnggotaRoomChat.create({
      data: {
        userId: authorId,
        projectCollaboration_RoomChatId: createRoom.id,
      },
    });

  if (!createForAuthor)
    return { status: 400, message: "Gagal Menambahkan Author" };

  // PROJECT YANG SUDAH DI CREATE ROOM AKAN DI HIDE AGAR HANYA ADA 1 GRUP UNTUK 1 PROYEK
  const hideProyek = await prisma.projectCollaboration.update({
    where: {
      id: colabId,
    },
    data: {
      isActive: false,
    },
  });

  if (!hideProyek) return { status: 400, message: "Gagal Menyimpan Proyek" };

  return { status: 201, message: "Berhasil Membuat Room" };
}
