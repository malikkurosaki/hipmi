import { funCheckCookies } from "@/app_modules/_global/fun/get/fun_check_cookies";
import PageSplash from "./dev/auth/splash/page";
import { redirect } from "next/navigation";
import { Login, SplashScreen } from "@/app_modules/auth";
import { RouterAuth } from "./lib/router_hipmi/router_auth";
import versionUpdate from "../../package.json";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { RouterHome } from "./lib/router_hipmi/router_home";
import { RouterAdminDashboard } from "./lib/router_hipmi/router_admin";

export default async function Page() {
  const version = versionUpdate.version;

  const checkCookies = await funCheckCookies();
  // console.log(checkCookies, "ini check cookies di page awal");
  if (checkCookies) return redirect("/dev/check-cookies");
  return redirect("/login"); 
  // const WIBU_REALTIME_TOKEN = process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;

  // return <Login  version={version} />;
  // return <SplashScreen checkCookies={checkCookies} />;
  return <PageSplash />; 
}
