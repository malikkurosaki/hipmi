import { AdminForum_HasilReportPosting } from "@/app_modules/admin/forum";
import { adminForum_getListReportPostingById } from "@/app_modules/admin/forum/fun/get/get_list_report_posting_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const listReport = await adminForum_getListReportPostingById(postingId);

  return (
    <>
      <AdminForum_HasilReportPosting
        postingId={postingId}
        listReport={listReport}
      />
    </>
  );
}
