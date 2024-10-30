import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";

export function redirectDonasiPage({
  data,
  router,
  onSetPage,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetPage: (val: any) => void;
}) {
  const path = RouterDonasi.status_galang_dana({ id: "" });

  if (data.status === "Publish") {
    onSetPage({
      menuId: 1,
      status: data.status,
    });
    router.push(path, { scroll: false });
  }

  if (data.status === "Reject") {
    onSetPage({
      menuId: 1,
      status: data.status,
    });
    router.push(path, { scroll: false });
  }

  if (data.status === "Berhasil") {
    const pathInvoice = RouterDonasi.detail_donasi_saya + data.appId;
    onSetPage({
      menuId: 2,
    });
    router.push(pathInvoice, { scroll: false });
  }

  if (data.status === "Donatur Baru") {
    const pathDetail = RouterDonasi.detail_publish + data.appId;
    onSetPage({
      menuId: 2,
    });
    router.push(pathDetail, { scroll: false });
  }

  if (data.status === "Kabar Donasi") {
    const pathKabar = RouterDonasi.detail_kabar + data.appId;
    router.push(pathKabar, { scroll: false });
  }

  if (data.status === "Pencairan Dana") {
    const pathPencairan = RouterDonasi.pencairan_dana + data.appId;
    router.push(pathPencairan, { scroll: false });
  }
}
