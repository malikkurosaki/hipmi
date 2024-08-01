import { RouterAdminDonasi } from "@/app/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function adminNotifikasi_findRouterDonasi({
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
  if (data.status === "Review") {
    const path = RouterAdminDonasi.table_review;
    router.push(path);
    onChangeNavbar({
      id: 3,
      childId: 33,
    });
  }

  if (
    data.status === "Menunggu" ||
    data.status === "Berhasil" ||
    data.status === "Proses" ||
    data.status === "Gagal"
  ) {
    const path = RouterAdminDonasi_OLD.detail_publish + data.appId;
    router.push(path, { scroll: false });
    onChangeNavbar({
      id: 3,
      childId: 32,
    });
  }

  //   if (data.status === "Draft") {
  //     router.push(routeName + "review");
  //     onChangeNavbar({
  //       id: 6,
  //       childId: 63,
  //     });
  //   }

  onToggleNavbar(true);
}
