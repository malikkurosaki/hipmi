import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import { DetailInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import funProgressBar from "@/app_modules/investasi/fun/fun_progress_bar";
import funTotalInvestorByIdInvestasi from "@/app_modules/investasi/fun/fun_total_investor_by_id";

export default async function Page({ params }: { params: { id: string } }) {
const investasiId = params.id
  const dataInvestasi = await getOneInvestasiById(investasiId);
  const loginUserId = await user_getOneUserId();

  return (
    <>
      <DetailInvestasi
        dataInvestasi={dataInvestasi as any}
        loginUserId={loginUserId}
      />
    </>
  );
}
