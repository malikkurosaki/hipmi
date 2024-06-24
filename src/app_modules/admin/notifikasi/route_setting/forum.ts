import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function adminNotifikasi_findRouterForum({
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
  const routeName = RouterAdminForum.table_report_posting;
  router.push(routeName);
   onChangeNavbar({
     id: 7,
     childId: 73,
   });
}
