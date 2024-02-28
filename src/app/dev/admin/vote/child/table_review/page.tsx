import { AdminVote_TableReview } from "@/app_modules/admin/vote";
import { AdminVote_getListTableByStatusId } from "@/app_modules/admin/vote/fun/get/get_list_table_by_status_id";


export default async function Page() {
  const listVote = await AdminVote_getListTableByStatusId("2")

  return (
    <>
      <AdminVote_TableReview listVote={listVote as any} />
    </>
  );
}
