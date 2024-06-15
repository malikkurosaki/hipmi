import { Event_Riwayat } from "@/app_modules/event";
import { Event_getListRiwayatSaya } from "@/app_modules/event/fun/get/get_list_riwayat_saya";
import { Event_getListSemuaRiwayat } from "@/app_modules/event/fun/get/get_list_semua_riwayat";
import { Event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const authorId = await user_getOneUserId();
  const dataSemuaRiwayat = await Event_getListSemuaRiwayat();
  const dataRiwayatSaya = await Event_getListRiwayatSaya(authorId);

  return (
    <Event_Riwayat
      dataSemuaRiwayat={dataSemuaRiwayat as any}
      dataRiwayatSaya={dataRiwayatSaya as any}
    />
  );
}
