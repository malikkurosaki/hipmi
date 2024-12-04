import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";

export function redirectInvestasiPage({
  data,
  router,
  onSetPage,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetPage: (val: any) => void;
}) {
  const path = RouterInvestasi_OLD.portofolio;

  if (data.status === "Publish") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
    router.push(path, { scroll: false });
  }
  //   console.log(data)

  if (data.status === "Reject") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
    router.push(path, { scroll: false });
  }

  //   if (data.status === "Peserta Event") {
  //     router.push(RouterEvent.detail_main + data.appId, { scroll: false });
  //   }
}
