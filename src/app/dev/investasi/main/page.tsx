import { MainInvestasi } from "@/app_modules/investasi";
import { investasi_funGetAllPublish } from "@/app_modules/investasi/fun/get_all_investasi";

export default async function Page() {
  const allData = await investasi_funGetAllPublish();

  return (
    <>
      <MainInvestasi listData={allData as any} />
    </>
  );
}
