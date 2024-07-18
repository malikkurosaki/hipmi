import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { HomeView } from "@/app_modules/home";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { job_getTwoForHomeView } from "@/app_modules/job/fun/get/get_two_for_home_view";
import notifikasi_countUserNotifikasi from "@/app_modules/notifikasi/fun/count/fun_count_by_id";
import { redirect } from "next/navigation";

export default async function Page() {
  const userId = await user_getOneUserId();
  const dataUser = await user_getOneByUserId(userId);
  const dataJob = await job_getTwoForHomeView();

  if (dataUser?.active === false) {
    return redirect(RouterHome.home_user_non_active);
  }

  if (dataUser?.masterUserRoleId === "2" || dataUser?.masterUserRoleId === "3")
    return redirect(RouterAdminDashboard.splash_admin);

  // if (dataUser?.Profile === null) return <ComponentGlobal_V2_LoadingPage />;

  // await new Promise((a, b) => {
  //   setTimeout(a, 3000);
  // });

  const countNotifikasi = await notifikasi_countUserNotifikasi();

  return (
    <>
      <HomeView
        dataUser={dataUser as any}
        dataJob={dataJob as any}
        countNotifikasi={countNotifikasi}
      />
    </>
  );
}
