import { Admin_Investasi } from "@/app_modules/admin/investasi";
import Admin_CountStatusInvestasi from "@/app_modules/admin/investasi/fun/count_status";
import Admin_funGetAllInvestasi from "@/app_modules/admin/investasi/fun/get_all_investasi";

export default async function Page() {
  const listInvestasi = await Admin_funGetAllInvestasi();
  const countDraft = await Admin_CountStatusInvestasi(1);
  const countReview = await Admin_CountStatusInvestasi(2);
  const countPublish = await Admin_CountStatusInvestasi(3);
  const countReject = await Admin_CountStatusInvestasi(4);

  return (
    <>
      <Admin_Investasi
        listInvestasi={listInvestasi as any}
        countDraft={countDraft}
        countReview={countReview}
        countPublish={countPublish}
        countReject={countReject}

      />
    </>
  );
}
