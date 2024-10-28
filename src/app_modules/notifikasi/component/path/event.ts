import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export function redirectEventPage({
  data,
  router,
  onSetPage,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetPage: (val: any) => void;
}) {
  const path = RouterEvent.status({id: ""});

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

  if (data.status === "Peserta Event") {
    router.push(RouterEvent.detail_main + data.appId, { scroll: false });
  }
}
