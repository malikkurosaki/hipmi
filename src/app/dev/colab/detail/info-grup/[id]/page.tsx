import prisma from "@/app/lib/prisma";
import { Colab_DetailInfoGrup } from "@/app_modules/colab";
import colab_getListAnggotaByRoomId from "@/app_modules/colab/fun/get/room_chat/get_list_anggota_by_room_id";

export default async function Page({ params }: { params: { id: string } }) {
  let roomId = params.id;
  const dataRoom = await colab_getListAnggotaByRoomId(roomId);

  return (
    <>
      <Colab_DetailInfoGrup dataRoom={dataRoom as any} />
    </>
  );
}
