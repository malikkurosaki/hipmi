import { AdminEvent_TableReview } from "@/app_modules/admin/event";
import { adminEvent_funGetListReview } from "@/app_modules/admin/event/fun";

export default async function Page() {
  const listReview = await adminEvent_funGetListReview({ page: 1 });

  return (
    <>
      <AdminEvent_TableReview listData={listReview as any} />
    </>
  );
}
