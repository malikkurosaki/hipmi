import Forum_Detail from "@/app_modules/forum/detail";
import { forum_getKomentarById } from "@/app_modules/forum/fun/get/get_komentar_by_id";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";
import { forum_countOneTotalKomentarById } from "@/app_modules/forum/fun/count/count_one_total_komentar_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const dataPosting = await forum_getOnePostingById(postingId);
  const listKomentar = await forum_getKomentarById(postingId);
  const totalKomentar = await forum_countOneTotalKomentarById(postingId)

  
  return (
    <>
      <Forum_Detail
        dataPosting={dataPosting as any}
        listKomentar={listKomentar as any}
        totalKomentar={totalKomentar}
      />
    </>
  );
}
