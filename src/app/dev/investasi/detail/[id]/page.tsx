import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { investasi_funGetOneInvestasiById } from "@/app_modules/investasi/_fun";
import { Investasi_UiDetailMain } from "@/app_modules/investasi/_ui";


export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const dataInvestasi = await investasi_funGetOneInvestasiById({ investasiId });

  return (
    <>
      <Investasi_UiDetailMain
        dataInvestasi={dataInvestasi as any}
        userLoginId={userLoginId}
      />
    </>
  );
}
