import { Colab_DetailGrupDiskusi } from "@/app_modules/colab";
import colab_getMessageByRoomId from "@/app_modules/colab/fun/get/room_chat/get_message_by_room_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let roomId = params.id;
  const listMsg = await colab_getMessageByRoomId(roomId);
  const userLoginId = await user_getOneUserId()

  return (
    <>
      <Colab_DetailGrupDiskusi roomId={roomId} listMsg={listMsg} userLoginId={userLoginId}/>
    </>
  );
}
