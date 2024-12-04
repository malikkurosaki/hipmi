import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_ReportKomentar } from "@/app_modules/forum";
import { forum_getMasterKategoriReport } from "@/app_modules/forum/fun/master/get_master_kategori_report";

export default async function Page({ params }: { params: { id: string } }) {
  let komentarId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const listReport = await forum_getMasterKategoriReport();
  


  return (
    <>
      <Forum_ReportKomentar
        komentarId={komentarId}
        listReport={listReport as any}
        userLoginId={userLoginId as any}
      />
    </>
  );
}
