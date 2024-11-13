import { UIGlobal_LayoutHeaderTamplate } from "@/app_modules/_global/ui";
import { Notifikasi_UiNewLayout } from "@/app_modules/notifikasi/_ui";
import { notifikasi_funGetKategoriApp } from "@/app_modules/notifikasi/fun/get/fun_get_kategori_app";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const masterKategori = await notifikasi_funGetKategoriApp();

  return (
    <>
      <Notifikasi_UiNewLayout
        header={<UIGlobal_LayoutHeaderTamplate title="Notifikasi" />}
        masterKategori={masterKategori}
      >
        {children}
      </Notifikasi_UiNewLayout>
    </>
  );
}
