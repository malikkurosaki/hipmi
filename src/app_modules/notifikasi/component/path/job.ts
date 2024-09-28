import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export function redirectJobPage({
  data,
  router,
  onSetPage,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetPage: (val: any) => void;
}) {
  const path = RouterJob.status;

  if (data.status === "Publish") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
  }

  if (data.status === "Reject") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
  }

  router.push(path, {scroll: false});
}
