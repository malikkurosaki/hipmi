import { Forum_ReportPosting } from "@/app_modules/forum";
import { forum_getMasterKategoriReport } from "@/app_modules/forum/fun/master/get_master_kategori_report";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const listReport = await forum_getMasterKategoriReport();

  return (
    <>
      <Forum_ReportPosting
        postingId={postingId}
        listReport={listReport as any}
      />
    </>
  );
}
