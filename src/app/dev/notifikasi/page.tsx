import { Notifikasi_MainView } from "@/app_modules/notifikasi";
import notifikasi_getByUserId from "@/app_modules/notifikasi/fun/get/get_notifiaksi_by_id";


export default async function Page() {
  const listNotifikasi = await notifikasi_getByUserId()

  return (
    <>
      <Notifikasi_MainView listNotifikasi={listNotifikasi as any} />
    </>
  );
}
