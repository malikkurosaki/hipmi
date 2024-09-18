import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { user_funGetOneUserId } from "@/app_modules/fun_global";
import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import { ProsesTransaksiInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

  const userLogin = await funGetUserProfile(userLoginId);
  const dataInvestasi = await getOneInvestasiById(params.id);

  // console.log(dataInvestasi);
  return (
    <>
      <ProsesTransaksiInvestasi
        dataInvestasi={dataInvestasi as any}
        userLogin={userLogin as any}
      />
    </>
  );
}
