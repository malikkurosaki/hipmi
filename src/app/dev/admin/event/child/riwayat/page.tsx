import { AdminEvent_Riwayat } from "@/app_modules/admin/event";
import { AdminEvent_getListAllRiwayat } from "@/app_modules/admin/event/fun/get/get_list_all_riwayat";

export default async function Page() {
  const listRiwayat = await AdminEvent_getListAllRiwayat()
  

  return (
    <>
      <AdminEvent_Riwayat listRiwayat={listRiwayat} />
    </>
  );
}
