import { Notifikasi_UiDonasi, Notifikasi_UiInvestasi } from "@/app_modules/notifikasi/_ui";
import notifikasi_getByUserId from "@/app_modules/notifikasi/fun/get/get_notifiaksi_by_id";

export default async function Page() {
  const listNotifikasi = await notifikasi_getByUserId({
    page: 1,
    kategoriApp: "Investasi",
  });

  return (
    <>
      <Notifikasi_UiInvestasi listNotifikasi={listNotifikasi} />
    </>
  );
}
