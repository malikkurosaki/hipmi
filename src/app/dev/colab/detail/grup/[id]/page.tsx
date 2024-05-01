import { Colab_DetailGrupDiskusi } from "@/app_modules/colab";
import colab_getMessageByRoomId from "@/app_modules/colab/fun/get/room_chat/get_message_by_room_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  let roomId = params.id;
  const userLoginId = await user_getOneUserId();
  let listMsg = await colab_getMessageByRoomId(roomId, 1);

  return (
    <>
      <Colab_DetailGrupDiskusi
        roomId={roomId}
        listMsg={listMsg}
        userLoginId={userLoginId}
      />
    </>
  );
}
