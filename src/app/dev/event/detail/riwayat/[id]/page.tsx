
import { Event_DetailRiwayat } from "@/app_modules/event";
import { Event_countTotalPesertaById } from "@/app_modules/event/fun/count/count_total_peserta_by_id";
import { Event_CekUserJoinById } from "@/app_modules/event/fun/get/cek_user_join_by_id";
import { Event_getListPesertaById } from "@/app_modules/event/fun/get/get_list_peserta_by_id";
import { Event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const dataEvent = await Event_getOneById(eventId);
  const listPeserta = await Event_getListPesertaById(eventId);
  const totalPeserta = await Event_countTotalPesertaById(eventId);

  return (
    <>
      <Event_DetailRiwayat
        dataEvent={dataEvent as any}
        listPeserta={listPeserta as any}
        totalPeserta={totalPeserta as any}
      />
    </>
  );
}
