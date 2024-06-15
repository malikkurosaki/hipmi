import { AdminAppInformation_MainView } from "@/app_modules/admin/app_info";
import adminAppInformation_getMasterBank from "@/app_modules/admin/app_info/fun/master/get_list_bank";
import adminAppInformation_getNomorAdmin from "@/app_modules/admin/app_info/fun/master/get_nomor_admin";

export default async function Page() {
  const nomorAdmin = await adminAppInformation_getNomorAdmin();
  const listBank = await adminAppInformation_getMasterBank();

  return (
    <>
      <AdminAppInformation_MainView
        nomorAdmin={nomorAdmin}
        listBank={listBank}
      />
    </>
  );
}
