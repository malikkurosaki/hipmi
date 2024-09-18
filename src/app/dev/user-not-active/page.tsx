import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { Home_UserNonActive } from "@/app_modules/home";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { redirect } from "next/navigation";

export default async function Page() {
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

  const dataUser = await user_getOneByUserId(userLoginId);

  if (dataUser?.active === true) {
    return redirect(RouterHome.main_home);
  }

  return (
    <>
      <Home_UserNonActive />
    </>
  );
}
