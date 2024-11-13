import { Notifikasi_UiDonasi } from "@/app_modules/notifikasi/_ui";
import notifikasi_getByUserId from "@/app_modules/notifikasi/fun/get/get_notifiaksi_by_id";

export default async function Page() {
  const listNotifikasi = await notifikasi_getByUserId({
    page: 1,
    kategoriApp: "Donasi",
  });

  return (
    <>
      <Notifikasi_UiDonasi listNotifikasi={listNotifikasi} />
    </>
  );
}
