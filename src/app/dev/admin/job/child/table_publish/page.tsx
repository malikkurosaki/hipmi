import { AdminJob_TablePublish } from "@/app_modules/admin/job";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";

export default async function Page() {
    const listPublish = await AdminJob_getListTableByStatusId("1")
    // console.log(listPublish)
    return (
      <>
        <AdminJob_TablePublish dataVote={listPublish} />
      </>
    );
}