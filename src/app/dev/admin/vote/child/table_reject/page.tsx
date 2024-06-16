import { AdminVote_TableReject } from "@/app_modules/admin/vote";
import { AdminVote_getListTableByStatusId } from "@/app_modules/admin/vote/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const dataVote = await AdminVote_getListTableByStatusId("4");
  return (
    <>
      <AdminVote_TableReject dataVote={dataVote as any}/>
    </>
  );
}
