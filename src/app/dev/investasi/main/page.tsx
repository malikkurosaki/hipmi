import { MainInvestasi } from "@/app_modules/investasi";
import funTotalInvestorByIdInvestasi from "@/app_modules/investasi/fun/fun_total_investor_by_id";
import { getListAllPublish } from "@/app_modules/investasi/fun/get_list_all_publish";
import getPembagianDeviden from "@/app_modules/investasi/fun/master/get_pembagian_deviden";
import getPencarianInvestor from "@/app_modules/investasi/fun/master/get_pencarian_investor";
import getPeriodeDeviden from "@/app_modules/investasi/fun/master/get_periode_deviden";

export default async function Page() {
  const data = await getListAllPublish();
  const pencarianInvestor = await getPencarianInvestor();
  const periodeDeviden = await getPeriodeDeviden();
  const pembagianDeviden = await getPembagianDeviden();

  // console.log(data)
  return (
    <>
      <MainInvestasi
        listData={data as any}
        pencarianInvestor={pencarianInvestor as any}
        periodeDeviden={periodeDeviden as any}
        pembagianDeviden={pembagianDeviden as any}
      />
    </>
  );
}
