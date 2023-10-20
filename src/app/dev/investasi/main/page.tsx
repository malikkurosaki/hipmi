import { MainInvestasi } from "@/app_modules/investasi";
import { getListAllInvestasi } from "@/app_modules/investasi/fun/get_list_all_investasi";
import getPembagianDeviden from "@/app_modules/investasi/fun/get_pembagian_deviden";
import getPencarianInvestor from "@/app_modules/investasi/fun/get_pencarian_investor";
import getPeriodeDeviden from "@/app_modules/investasi/fun/get_periode_deviden";

export default async function Page() {
    const data = await getListAllInvestasi()
    const pencarianInvestor = await getPencarianInvestor();
    const periodeDeviden = await getPeriodeDeviden();
    const pembagianDeviden = await getPembagianDeviden();
  
    // console.log(data)
    return <>
    <MainInvestasi 
    listData={data as any}
    pencarianInvestor={pencarianInvestor as any}
    periodeDeviden={periodeDeviden as any}
    pembagianDeviden={pembagianDeviden as any}
    
    />
    </>
    
}