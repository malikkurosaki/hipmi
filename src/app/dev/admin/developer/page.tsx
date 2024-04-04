import AdminDeveloper from "@/app_modules/admin/developer";
import adminDeveloper_funGetListAllAdmin from "@/app_modules/admin/developer/fun/get/fun_get_list_all_admin";
import adminDeveloper_funGetListAllUser from "@/app_modules/admin/developer/fun/get/fun_get_list_all_user";
import _ from "lodash";

export default async function Page() {
  const listUser = await adminDeveloper_funGetListAllUser();
  const listAdmin = await adminDeveloper_funGetListAllAdmin();

  return (
    <>
      <AdminDeveloper listUser={listUser as any} listAdmin={listAdmin as any} />
    </>
  );
}
