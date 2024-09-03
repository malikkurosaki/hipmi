import { AdminEvent_TableReview } from "@/app_modules/admin/event";
import { adminEvent_funGetListReview } from "@/app_modules/admin/event/fun";
import { AdminEvent_getListTableByStatusId } from "@/app_modules/admin/event/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const listReview = await adminEvent_funGetListReview({ page: 1 });

  return (
    <>
      <AdminEvent_TableReview listData={listReview as any} />
    </>
  );
}
