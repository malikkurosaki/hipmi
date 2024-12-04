import { Notifikasi_UiForum } from "@/app_modules/notifikasi/_ui";
import notifikasi_getByUserId from "@/app_modules/notifikasi/fun/get/get_notifiaksi_by_id";

export default async function Page() {
  const listNotifikasi = await notifikasi_getByUserId({
    page: 1,
    kategoriApp: "Forum",
  });

  return (
    <>
      <Notifikasi_UiForum listNotifikasi={listNotifikasi} />
    </>
  );
}
