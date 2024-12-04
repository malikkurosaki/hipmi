import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { notifikasi_funDonasiCheckStatus } from "../../fun/check/fun_check_donasi_status";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";

export async function redirectDonasiPage({
  appId,
  dataId,
  categoryPage,
  router,
  onLoadDataEvent,
  onSetMenuId,
  onSetVisible,
  onLoadCountNtf,
}: {
  appId: string;
  dataId: string;
  categoryPage: string;
  router: AppRouterInstance;
  onLoadDataEvent: (val: any) => void;
  onSetMenuId(val: number): void;
  onSetVisible(val: boolean): void;
  onLoadCountNtf(val: number): void;
}) {
  const check = await notifikasi_funDonasiCheckStatus({ id: appId });

  if (check.status == 200) {
    const loadListNotifikasi = await notifikasi_getByUserId({
      page: 1,
      kategoriApp: categoryPage as any,
    });
    onLoadDataEvent(loadListNotifikasi);

    const loadCountNotifikasi = await notifikasi_countUserNotifikasi();
    onLoadCountNtf(loadCountNotifikasi);

    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);

      const path = `/dev/donasi/detail/${check.statusName}/${appId}`;
      onSetMenuId(1);
      router.push(path, { scroll: false });
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
