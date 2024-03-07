import { Forum_Forumku } from "@/app_modules/forum";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  const authorId = params.id;
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

  return (
    <>
      <Forum_Forumku auhtorSelectedData={auhtorSelectedData as any} />
    </>
  );
}
