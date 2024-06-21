import { AdminJob_TableReject } from "@/app_modules/admin/job";
import adminJob_getListReject from "@/app_modules/admin/job/fun/get/get_list_reject";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const listReject = await adminJob_getListReject({ page: 1 });

  return (
    <>
      <AdminJob_TableReject dataReject={listReject} />
    </>
  );
}
