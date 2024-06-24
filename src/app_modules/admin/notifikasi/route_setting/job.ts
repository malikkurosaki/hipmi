import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function adminNotifikasi_findRouterJob({
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
  const routeName = "/dev/admin/job/child/";

  if (data.status === "Review") {
    router.push(routeName + _.lowerCase(data.status));
    onChangeNavbar({
      id: 6,
      childId: 63,
    });
  }

  if (data.status === "Draft") {
    router.push(routeName + "review");
    onChangeNavbar({
      id: 6,
      childId: 63,
    });
  }

  onToggleNavbar(true);
}
