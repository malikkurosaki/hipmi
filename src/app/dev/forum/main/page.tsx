
import { Forum_Beranda } from "@/app_modules/forum";
import { forum_getListAllPosting } from "@/app_modules/forum/fun/get/get_list_all_posting";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const listForum = await forum_getListAllPosting();
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
