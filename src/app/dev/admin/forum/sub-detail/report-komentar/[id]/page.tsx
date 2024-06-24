import { AdminForum_HasilReportKomentar } from "@/app_modules/admin/forum";
import { adminForum_getListReportKomentarbyId } from "@/app_modules/admin/forum/fun/get/get_list_report_komentar_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let komentarId = params.id;
  const listReport = await adminForum_getListReportKomentarbyId({komentarId: komentarId, page: 1});

  return (
    <>
      <AdminForum_HasilReportKomentar
        listReport={listReport}
        komentarId={komentarId}
      />
    </>
  );
}
