import { Event_DetailKontribusi } from "@/app_modules/event";
import { Event_countTotalPesertaById } from "@/app_modules/event/fun/count/count_total_peserta_by_id";
import { Event_getListPesertaById } from "@/app_modules/event/fun/get/get_list_peserta_by_id";
import { Event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const dataEvent = await Event_getOneById(eventId);
  const listKontributor = await Event_getListPesertaById(eventId);
  const totalPeserta = await Event_countTotalPesertaById(eventId)
  return (
    <>
      <Event_DetailKontribusi
        dataEvent={dataEvent as any}
        listKontributor={listKontributor as any}
        totalPeserta={totalPeserta}
      />
    </>
  );
}
