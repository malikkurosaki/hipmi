import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funCheckCookies } from "@/app_modules/_global/fun/get/fun_check_cookies";
import { permanentRedirect, redirect } from "next/navigation";
import { RealtimeProvider } from "../lib";
import { ServerEnv } from "../lib/server_env";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { RouterHome } from "../lib/router_hipmi/router_home";
import { CheckCookies_UiLayout } from "@/app_modules/check_cookies";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkCookies = await funCheckCookies();
  const userLoginId = await funGetUserIdByToken();
  if (!checkCookies) return redirect("/");

  // const dataUser = await funGlobal_getUserById({ userId: userLoginId });
  // console.log(dataUser?.active, dataUser?.username, "ini di layout");

  // if(dataUser?.active == false) return permanentRedirect(RouterHome.home_user_non_active);
  // const WIBU_REALTIME_TOKEN = process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;
  // console.log(WIBU_REALTIME_TOKEN, "check cookies di layout dalam");

  return (
    <>
      <RealtimeProvider
        userLoginId={userLoginId as string}
        WIBU_REALTIME_TOKEN={
          ServerEnv.value?.NEXT_PUBLIC_WIBU_REALTIME_TOKEN as string
        }
      />

      {children}
      {/* <CheckCookies_UiLayout dataUser={dataUser as any}>
        {children}
      </CheckCookies_UiLayout> */}
    </>
  );
}
