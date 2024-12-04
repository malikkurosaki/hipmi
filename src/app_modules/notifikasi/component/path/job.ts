import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { notifikasi_funJobCheckStatus } from "../../fun/check/fun_check_job_status";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";

export async function notifikasi_jobCheckStatus({
  appId,
  dataId,
  categoryPage,
  router,
  onLoadDataJob,
  onSetJobMenuId,
  onSetVisible,
  onLoadCountNtf,
}: {
  appId: string;
  dataId: string;
  categoryPage:string
  router: AppRouterInstance;
  onLoadDataJob: (val: any) => void;
  onSetJobMenuId(val: number): void;
  onSetVisible(val: boolean): void;
  onLoadCountNtf(val: number): void;
}) {
  const check = await notifikasi_funJobCheckStatus({
    id: appId,
  });

  const loadListNotifikasi = await notifikasi_getByUserId({
    page: 1,
    kategoriApp: categoryPage as any,
  });
  onLoadDataJob(loadListNotifikasi);

  const loadCountNotifikasi = await notifikasi_countUserNotifikasi();
  onLoadCountNtf(loadCountNotifikasi);

  if (check.status == 200) {
    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);
      const path = `/dev/job/detail/${check.statusName}/${appId}`;
      onSetJobMenuId(2);
      router.push(path, { scroll: false });
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
