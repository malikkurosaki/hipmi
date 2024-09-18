import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { Forum_ReportPostingLainnya } from "@/app_modules/forum";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
 const userLoginId = await user_funGetOneUserId();
 if (!userLoginId) return <CheckCookies_UiView />;


  return (
    <>
      <Forum_ReportPostingLainnya
        postingId={postingId}
        userLoginId={userLoginId}
      />
    </>
  );
}
