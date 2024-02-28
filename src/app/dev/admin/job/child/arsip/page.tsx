import AdminJob_TableArsip from "@/app_modules/admin/job/child/arsip";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";


export default async function Page() {
  const dataJob = await AdminJob_getListTableByStatusId("0")

  return (
    <>
      <AdminJob_TableArsip dataVote={dataJob} />
    </>
  );
}
