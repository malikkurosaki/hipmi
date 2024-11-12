import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { notifikasi_funJobCheckStatus } from "../../fun/check/fun_check_job_status";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";

export async function notifikasi_jobCheckStatus({
  appId,
  dataId,
}: {
  appId: string;
  dataId: string;
}) {
  const check = await notifikasi_funJobCheckStatus({
    id: appId,
  });

  if (check.status == 200) {
    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      return {
        success: true,
        statusId: check.statusId,
      };
    } else {
      return {
        success: false,
      };
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
