import { RouterAdminVote } from "@/app/lib/router_admin/router_admin_vote";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function adminNotifikasi_findRouterVoting({
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
  const path = RouterAdminVote.table_review;

  if (data.status === "Review") {
    router.push(path, { scroll: false });
    onChangeNavbar({
      id: 5,
      childId: 53,
    });
  }

  onToggleNavbar(true);
}
