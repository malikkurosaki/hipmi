import { Event_Riwayat } from "@/app_modules/event";
import { event_getListRiwayatSaya } from "@/app_modules/event/fun/get/get_list_riwayat_saya";
import { event_getListSemuaRiwayat } from "@/app_modules/event/fun/get/riwayat/get_list_semua_riwayat";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const dataSemuaRiwayat = await event_getListSemuaRiwayat({ page: 1 });
  const dataRiwayatSaya = await event_getListRiwayatSaya({ page: 1 });

  return (
    <Event_Riwayat
      dataSemuaRiwayat={dataSemuaRiwayat as any}
      dataRiwayatSaya={dataRiwayatSaya as any}
    />
  );
}
