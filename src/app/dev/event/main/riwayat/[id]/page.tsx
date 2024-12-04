import { Event_Riwayat } from "@/app_modules/event";
import { event_getListRiwayatSaya } from "@/app_modules/event/fun/get/riwayat/get_list_riwayat_saya";
import { event_getListSemuaRiwayat } from "@/app_modules/event/fun/get/riwayat/get_list_semua_riwayat";

export default async function Page({ params }: { params: { id: string } }) {
  let statusRiwayatId = params.id;

  const dataSemuaRiwayat = await event_getListSemuaRiwayat({ page: 1 });
  const dataRiwayatSaya = await event_getListRiwayatSaya({ page: 1 });

  if (statusRiwayatId == "1") {
    return (
      <>
        <Event_Riwayat
          statusId={statusRiwayatId}
          dataSemuaRiwayat={dataSemuaRiwayat as any}
        />
      </>
    );
  }

  if (statusRiwayatId == "2") {
    return (
      <>
        <Event_Riwayat
          statusId={statusRiwayatId}
          dataRiwayatSaya={dataRiwayatSaya as any}
        />
      </>
    );
  }
}
