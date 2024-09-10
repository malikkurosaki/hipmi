import { AdminVote_TablePublish } from "@/app_modules/admin/vote";
import { AdminVote_getListTableByStatusId } from "@/app_modules/admin/vote/fun/get/get_list_table_by_status_id";
import { adminVote_funGetListPublish } from "@/app_modules/admin/vote/fun/get/status/get_list_publish";

export default async function Page() {
    const dataVote = await adminVote_funGetListPublish({page: 1});

    return (
      <>
        <AdminVote_TablePublish dataVote={dataVote} />
      </>
    );
}