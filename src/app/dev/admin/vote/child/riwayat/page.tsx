import { AdminVote_Riwayat } from "@/app_modules/admin/vote";
import { AdminVote_getListTableByStatusId } from "@/app_modules/admin/vote/fun/get/get_list_table_by_status_id";

export default async function Page() {
  const dataVote = await AdminVote_getListTableByStatusId("0");

  return (
    <>
      <AdminVote_Riwayat dataVote={dataVote as any} />
    </>
  );
}
