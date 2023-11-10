import { Admin_Investasi } from "@/app_modules/admin/investasi";
import Admin_funGetAllInvestasi from "@/app_modules/admin/investasi/fun/get_all_investasi";

export default async function Page() {
  const listInvestasi = await Admin_funGetAllInvestasi();
  // console.log(listInvestasi)
  return (
    <>
      <Admin_Investasi listInvestasi={listInvestasi as any} />
    </>
  );
}
