import { AdminJob_TableReview } from "@/app_modules/admin/job";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const listReview = await AdminJob_getListTableByStatusId("2");
  return (
    <>
      <AdminJob_TableReview dataVote={listReview} />
    </>
  );
}
