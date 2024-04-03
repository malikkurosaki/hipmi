import { HomeView } from "@/app_modules/home";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import _ from "lodash";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { user_getOneById } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { redirect } from "next/navigation";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";

export default async function Page() {
  const userId = await User_getUserId();
  const dataUser = await user_getOneById(userId);

  if (dataUser?.masterUserRoleId === "2" || dataUser?.masterUserRoleId === "3")
    return redirect(RouterAdminDashboard.splash_admin);
  // await new Promise((a, b) => {
  //   setTimeout(a, 4000);
  // });

  return (
    <>
      <HomeView dataUser={dataUser as any} />
    </>
  );
}
