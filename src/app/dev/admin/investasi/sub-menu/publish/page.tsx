import { Admin_TablePublishInvestasi } from "@/app_modules/admin/investasi";
import Admin_funGetAllInvestasi from "@/app_modules/admin/investasi/fun/get_all_investasi";

export default async function Page() {
  const listInvestasi = await Admin_funGetAllInvestasi();

  return (
    <>
      <Admin_TablePublishInvestasi dataInvestsi={listInvestasi as any} />
    </>
  );
}
