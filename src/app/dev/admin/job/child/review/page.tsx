import { AdminJob_TableReview } from "@/app_modules/admin/job";
import adminJob_getListReview from "@/app_modules/admin/job/fun/get/get_list_review";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const dataReview = await adminJob_getListReview({ page: 1 });

  return (
    <>
      <AdminJob_TableReview dataReview={dataReview} />
    </>
  );
}
