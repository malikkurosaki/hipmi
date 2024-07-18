import adminForum_funGetAllReportKomentar from "@/app_modules/admin/forum/fun/get/get_all_report_komentar";
import AdminForum_TableReportKomentar from "@/app_modules/admin/forum/sub_menu/table_report_komentar";

export default async function Page() {
  const listData = await adminForum_funGetAllReportKomentar({ page: 1 });

  return (
    <>
      <AdminForum_TableReportKomentar listData={listData} />
    </>
  );
}
