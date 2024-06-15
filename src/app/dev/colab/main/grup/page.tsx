import colab_getListRoomChatByAuthorId from "@/app_modules/colab/fun/get/room_chat/get_list_room_by_author_id";
import Colab_GrupDiskus from "@/app_modules/colab/main/grup";

export default async function Page() {
  const listRoom = await colab_getListRoomChatByAuthorId();

  return (
    <>
      <Colab_GrupDiskus listRoom={listRoom as any} />
    </>
  );
}
