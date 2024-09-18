import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { Donasi_MetodePembayaran } from "@/app_modules/donasi";
import { Donasi_getMasterBank } from "@/app_modules/donasi/fun/master/get_bank";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({params}: {params: {id: string}}) {
    let donasiId= params.id
    const listBank = await Donasi_getMasterBank()
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;


    return<>
    <Donasi_MetodePembayaran listBank={listBank} donasiId={donasiId} authorId={userLoginId}/>
    </>
}