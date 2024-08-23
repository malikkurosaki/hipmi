import { ComponentNotifikasi_CardSkeleton } from "@/app_modules/notifikasi/component";
import { notifikasi_funGetKategoriApp } from "@/app_modules/notifikasi/fun/get/fun_get_kategori_app";
import notifikasi_getByUserId from "@/app_modules/notifikasi/fun/get/get_notifiaksi_by_id";
import { Notifikasi_MainView } from "@/app_modules/notifikasi/view";
import { Suspense } from "react";

export default async function Page() {
  const listNotifikasi = await notifikasi_getByUserId({
    page: 1,
    kategoriApp: "Semua",
  });
  const masterKategori = await notifikasi_funGetKategoriApp();

  return (
    <>
      <Suspense fallback={<ComponentNotifikasi_CardSkeleton />}>
        <Notifikasi_MainView
          listNotifikasi={listNotifikasi as any}
          masterKategori={masterKategori}
        />
      </Suspense>
    </>
  );
}
