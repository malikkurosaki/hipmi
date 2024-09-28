import { Forum_Forumku } from "@/app_modules/forum";
import { forum_getAllPostingByAuhtorId } from "@/app_modules/forum/fun/get/get_list_posting_by_author_id";
import { forum_countOneTotalKomentarById } from "@/app_modules/forum/fun/count/count_one_total_komentar_by_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import _ from "lodash";
import { forum_countPostingByAuthorId } from "@/app_modules/forum/fun/count/count_posting_by_author_id";

export default async function Page({ params }: { params: { id: string } }) {
  const authorId = params.id;
  const userLoginId = await user_getOneUserId();
  const dataAuthor = await user_getOneByUserId(authorId);
  const auhtorSelectedData = _.omit(dataAuthor, [
    "Profile.email",
    "Profile.alamat",
    "Profile.jenisKelamin",
    "Profile.createdAt",
    "Profile.updatedAt",
    "Profile.imagesBackgroundId",
  ]);
  // console.log(dataAuthor)
  // console.log(auhtorSelectedData)

  // await new Promise((a, b) => {
  //   setTimeout(a, 1000);
  // });

  const dataPosting = await forum_getAllPostingByAuhtorId({authorId: authorId, page: 1});
  const totalPosting = await forum_countPostingByAuthorId(authorId);

  return (
    <>
      <Forum_Forumku
        auhtorSelectedData={auhtorSelectedData as any}
        dataPosting={dataPosting as any}
        totalPosting={totalPosting}
        userLoginId={userLoginId as any}
      />
    </>
  );
}
