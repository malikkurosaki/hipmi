import Forum_MainDetail from "@/app_modules/forum/detail/main_detail";
import { forum_funGetAllKomentarById } from "@/app_modules/forum/fun/get/get_all_komentar_by_id";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";
import { forum_countOneTotalKomentarById } from "@/app_modules/forum/fun/count/count_one_total_komentar_by_id";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { redirect } from "next/navigation";
import { forum_countTotalKomenById } from "@/app_modules/forum/fun/count/count_total_komentar_by_id";
import { CheckCookies_UiView } from "@/app_modules/check_cookies";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

  const dataPosting = await forum_getOnePostingById(postingId);
  const listKomentar = await forum_funGetAllKomentarById({
    postingId: postingId,
    page: 1,
  });

  dataPosting?.isActive === false && redirect(RouterForum.beranda);

  const countKomentar = await forum_countTotalKomenById(postingId);

  return (
    <>
      <Forum_MainDetail
        dataPosting={dataPosting as any}
        listKomentar={listKomentar as any}
        userLoginId={userLoginId}
        countKomentar={countKomentar}
      />
    </>
  );
}
