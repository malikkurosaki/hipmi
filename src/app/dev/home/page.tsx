import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { redirect } from "next/navigation";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";

export default async function Page() {
  const userId = await user_getOneUserId();
  const dataUser = await user_getOneByUserId(userId);

  if (dataUser?.active === false) {
    return redirect(RouterHome.home_user_non_active);
  }

  if (dataUser?.masterUserRoleId === "2" || dataUser?.masterUserRoleId === "3")
    return redirect(RouterAdminDashboard.splash_admin);

  // if (dataUser?.Profile === null) return <ComponentGlobal_V2_LoadingPage />;

  // await new Promise((a, b) => {
  //   setTimeout(a, 4000);
  // });

  return (
    <>
      <HomeView dataUser={dataUser as any} />
    </>
  );
}
