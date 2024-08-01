import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { RouterAdminVote } from "@/app/lib/router_admin/router_admin_vote";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function adminNotifikasi_findRouterEvent({
  data,
  router,
  onChangeNavbar,
  onToggleNavbar,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onChangeNavbar: (val: any) => void;
  onToggleNavbar: (val: any) => void;
}) {
  const path = RouterAdminEvent.table_review

  if (data.status === "Review") {
    router.push(path, { scroll: false });
    onChangeNavbar({
      id: 4,
      childId: 43,
    });
  }

  onToggleNavbar(true);
}
