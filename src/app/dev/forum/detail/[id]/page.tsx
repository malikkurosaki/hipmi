import Forum_Detail from "@/app_modules/forum/detail";
import { forum_getKomentarById } from "@/app_modules/forum/fun/get/get_komentar_by_id";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";
import { forum_countOneTotalKomentarById } from "@/app_modules/forum/fun/count/count_one_total_komentar_by_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;

  const userLoginId = await user_getOneUserId();
  const dataPosting = await forum_getOnePostingById(postingId);
  const listKomentar = await forum_getKomentarById(postingId);

  dataPosting?.isActive === false && redirect(RouterForum.beranda);

  return (
    <>
      <Forum_Detail
        dataPosting={dataPosting as any}
        listKomentar={listKomentar as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
