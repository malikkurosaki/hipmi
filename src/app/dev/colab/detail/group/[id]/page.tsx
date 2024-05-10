import adminColab_getOneRoomChatById from "@/app_modules/admin/colab/fun/get/get_one_room_chat_by_id";
import { Colab_GroupChatView } from "@/app_modules/colab";
import colab_getMessageByRoomId from "@/app_modules/colab/fun/get/room_chat/get_message_by_room_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  const roomId = params.id;
  const userLoginId = await user_getOneUserId();
  const dataRoom = (await adminColab_getOneRoomChatById({ roomId: roomId }))
    .data;
  const selectRoom = _.omit(dataRoom, [
    "ProjectCollaboration",
    "ProjectCollaboration_AnggotaRoomChat",
  ]);
  let listMsg = await colab_getMessageByRoomId({roomId: roomId, page: 1});

  return (
    <>
      <Colab_GroupChatView
        userLoginId={userLoginId}
        listMsg={listMsg}
        selectRoom={selectRoom as any}
      />
    </>
  );
}
