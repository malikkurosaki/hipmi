import { RouterAdminDonasi } from "@/app/lib/router_admin/router_admin_donasi";
import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function adminNotifikasi_findRouterInvestasi({
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
    const path = RouterAdminInvestasi.table_review;
    router.push(path);
    onChangeNavbar({
      id: 2,
      childId: 23,
    });
  }

  //   if (
  //     data.status === "Menunggu" ||
  //     data.status === "Berhasil" ||
  //     data.status === "Proses" ||
  //     data.status === "Gagal"
  //   ) {
  //     const path = RouterAdminDonasi_OLD.detail_publish + data.appId;
  //     router.push(path, { scroll: false });
  //     onChangeNavbar({
  //       id: 3,
  //       childId: 32,
  //     });
  //   }

  onToggleNavbar(true);
}
