import adminAppInformation_getMasterBank from "@/app_modules/admin/app_info/fun/master/get_list_bank";
import adminAppInformation_getNomorAdmin from "@/app_modules/admin/app_info/fun/master/get_nomor_admin";
import { AdminAppInformation_UiMain } from "@/app_modules/admin/app_info/ui";

export default async function Page() {
  const nomorAdmin = await adminAppInformation_getNomorAdmin();
  const listBank = await adminAppInformation_getMasterBank();

  return (
    <>
      <AdminAppInformation_UiMain nomorAdmin={nomorAdmin} listBank={listBank} />
    </>
  );
}
