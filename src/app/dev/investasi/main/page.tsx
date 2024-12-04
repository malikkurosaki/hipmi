import { Investasi_UiBeranda } from "@/app_modules/investasi/_ui";
import { investasi_funGetAllPublish } from "@/app_modules/investasi/fun/get_all_investasi";

export default async function Page() {
  const allData = await investasi_funGetAllPublish({ page: 1 });

  return (
    <>
      <Investasi_UiBeranda dataInvestasi={allData as any} />
    </>
  );
}
