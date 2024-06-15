import { Admin_TableRejectInvestasi } from "@/app_modules/admin/investasi";
import Admin_funGetAllInvestasi from "@/app_modules/admin/investasi/fun/get_all_investasi";

export default async function Page() {
    const dataInvestsi = await Admin_funGetAllInvestasi()
    return <>
    <Admin_TableRejectInvestasi dataInvestsi={dataInvestsi as any}/>
    
    </>
}