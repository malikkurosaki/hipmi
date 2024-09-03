import { AdminEvent_TablePublish } from "@/app_modules/admin/event";
import { adminEvent_funGetListPublish } from "@/app_modules/admin/event/fun";
import { AdminEvent_getListTableByStatusId } from "@/app_modules/admin/event/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const listPublish = await adminEvent_funGetListPublish({page: 1});

  return (
    <>
      <AdminEvent_TablePublish listPublish={listPublish as any} />
    </>
  );
}
