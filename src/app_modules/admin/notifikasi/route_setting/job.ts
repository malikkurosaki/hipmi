import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import { admin_funCheckStatusJob } from "../fun/get/fun_check_status_job";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";

export async function adminNotifikasi_findRouterJob({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  const check = await admin_funCheckStatusJob({ id: data.appId });

  if (check) {
    const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
      notifId: data?.id,
    });

    if (udpateReadNotifikasi.status == 200) {
      return true;
    } else {
      return false;
    }
  } else {
    ComponentAdminGlobal_NotifikasiPeringatan("Status telah dirubah oleh user");
  }
}
