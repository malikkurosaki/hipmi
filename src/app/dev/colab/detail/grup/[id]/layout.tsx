import prisma from "@/app/lib/prisma";
import { LayoutColab_DetailGrupDiskusi } from "@/app_modules/colab";
import colab_getListAnggotaByRoomId from "@/app_modules/colab/fun/get/room_chat/get_list_anggota_by_room_id";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let roomId = params.id;
  // const listAnggota = await colab_getListAnggotaByRoomId(roomId);

  return (
    <>
      <LayoutColab_DetailGrupDiskusi>{children}</LayoutColab_DetailGrupDiskusi>
    </>
  );
}
