import { Forum_ReportKomentar } from "@/app_modules/forum";
import { forum_getMasterKategoriReport } from "@/app_modules/forum/fun/master/get_master_kategori_report";

export default async function Page({ params }: { params: { id: string } }) {
  let komentarId = params.id;
  const listReport = await forum_getMasterKategoriReport();

  return (
    <>
      <Forum_ReportKomentar
        komentarId={komentarId}
        listReport={listReport as any}
      />
    </>
  );
}
