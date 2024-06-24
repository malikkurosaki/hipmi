import { Forum_Beranda } from "@/app_modules/forum";
import { forum_new_getAllPosting } from "@/app_modules/forum/fun/get/new_get_all_posting";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const listForum = await forum_new_getAllPosting({ page: 1 });
  const userLoginId = await user_getOneUserId();

  // console.log(JSON.stringify(listForum, null, 2));

  return (
    <>
      <Forum_Beranda listForum={listForum as any} userLoginId={userLoginId} />
    </>
  );
}
