
import { Forum_Beranda } from "@/app_modules/forum";
import { forum_getListAllPosting } from "@/app_modules/forum/fun/get/get_list_all_posting";
import { forum_new_getAllPosting } from "@/app_modules/forum/fun/get/new_get_all_posting";
import forum_v2_getAllPosting from "@/app_modules/forum/fun/get/v2_get_all_posting";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const listForum = await forum_v2_getAllPosting({});
  const userLoginId = await user_getOneUserId();

  return (
    <>
      <Forum_Beranda
        listForum={listForum as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
