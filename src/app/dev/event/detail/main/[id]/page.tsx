import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Event_DetailMain } from "@/app_modules/event";
import { Event_countTotalPesertaById } from "@/app_modules/event/fun/count/count_total_peserta_by_id";
import { Event_CekUserJoinById } from "@/app_modules/event/fun/get/cek_user_join_by_id";
import { Event_getListPesertaById } from "@/app_modules/event/fun/get/get_list_peserta_by_id";
import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const dataEvent = await event_getOneById(eventId);
  const listPeserta = await Event_getListPesertaById(eventId);
  const isJoin = await Event_CekUserJoinById(eventId, userLoginId);
  const totalPeserta = await Event_countTotalPesertaById(eventId);

  return (
    <>
      <Event_DetailMain
        dataEvent={dataEvent as any}
        listPeserta={listPeserta as any}
        userLoginId={userLoginId}
        isJoin={isJoin}
        totalPeserta={totalPeserta as any}
      />
    </>
  );
}
