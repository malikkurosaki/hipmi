import { AdminForum_TableReportPosting } from "@/app_modules/admin/forum";
import adminForum_funGetAllReportPosting from "@/app_modules/admin/forum/fun/get/get_all_report_posting";

export default async function Page() {
  const listData = await adminForum_funGetAllReportPosting({ page: 1 });

  return (
    <>
      <AdminForum_TableReportPosting listData={listData} />
    </>
  );
}
