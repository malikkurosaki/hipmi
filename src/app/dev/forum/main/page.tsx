import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { Forum_Beranda } from "@/app_modules/forum";
import { forum_new_getAllPosting } from "@/app_modules/forum/fun/get/new_get_all_posting";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
   const userLoginId = await user_funGetOneUserId();
   if (!userLoginId) return <CheckCookies_UiView />;

  const listForum = await forum_new_getAllPosting({ page: 1 });
  

  // console.log(JSON.stringify(listForum, null, 2));

  return (
    <>
      <Forum_Beranda listForum={listForum as any} userLoginId={userLoginId} />
    </>
  );
}
