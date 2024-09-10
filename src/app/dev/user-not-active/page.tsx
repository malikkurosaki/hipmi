import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { Home_UserNonActive } from "@/app_modules/home";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { redirect } from "next/navigation";

export default async function Page() {
  const userId = await user_funGetOneUserId();
  const dataUser = await user_getOneByUserId(userId);

  if (dataUser?.active === true) {
    return redirect(RouterHome.main_home);
  }

  return (
    <>
      <Home_UserNonActive />
    </>
  );
}
