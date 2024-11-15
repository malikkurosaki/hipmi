import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { RouterAdminVote } from "@/app/lib/router_admin/router_admin_vote";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { admin_funEventCheckStatus } from "../fun/get";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";

export async function adminNotifikasi_findRouterEvent({
  data,

}: {
  data: MODEL_NOTIFIKASI;

}) {
  const check = await admin_funEventCheckStatus({id: data.appId})

  if (check.status == 200) {
    const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
      notifId: data?.id,
    });

    if (udpateReadNotifikasi.status == 200) {
      return {
        success: true,
        statusName: check.statusName,
      };
    } else {
      return {
        success: false,
        statusName: "",
      };
    }
  } else {
    ComponentAdminGlobal_NotifikasiPeringatan("Status telah dirubah oleh user");
  }
}
