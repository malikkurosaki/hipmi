import { Forum_Forumku } from "@/app_modules/forum";
import { forum_getListPostingByAuhtorId } from "@/app_modules/forum/fun/get/get_list_posting_by_author_id";
import { forum_countOneTotalKomentarById } from "@/app_modules/forum/fun/count/count_one_total_komentar_by_id";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
import _ from "lodash";
import { forum_countPostingByAuthorId } from "@/app_modules/forum/fun/count/count_posting_by_author_id";

export default async function Page({ params }: { params: { id: string } }) {
  const authorId = params.id;
  const userLoginId = await User_getUserId()
  const dataAuthor = await user_getOneById(authorId);
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

  

  const dataPosting = await forum_getListPostingByAuhtorId(authorId);
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
