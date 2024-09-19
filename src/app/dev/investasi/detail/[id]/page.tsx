import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { DetailInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const userLoginId = await funGetUserIdByToken();
  
  const dataInvestasi = await getOneInvestasiById(investasiId);

  return (
    <>
      <DetailInvestasi
        dataInvestasi={dataInvestasi as any}
        loginUserId={userLoginId}
      />
    </>
  );
}
