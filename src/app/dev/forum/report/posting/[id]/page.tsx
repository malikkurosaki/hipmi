import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { Forum_ReportPosting } from "@/app_modules/forum";
import { forum_getMasterKategoriReport } from "@/app_modules/forum/fun/master/get_master_kategori_report";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const listReport = await forum_getMasterKategoriReport();
 const userLoginId = await user_funGetOneUserId();
 if (!userLoginId) return <CheckCookies_UiView />;

  return (
    <>
      <Forum_ReportPosting
        postingId={postingId}
        listReport={listReport as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
