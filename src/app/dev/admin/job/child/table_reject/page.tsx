import { AdminJob_TableReject } from "@/app_modules/admin/job";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";


export default async function Page() {
  const listReject = await AdminJob_getListTableByStatusId("4");

  return (
    <>
      <AdminJob_TableReject dataVote={listReject} />
    </>
  );
}
