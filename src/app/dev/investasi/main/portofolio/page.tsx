import {
  investasi_funGetAllInvestasiNonPublishByUserId,
  investasi_funGetAllPublishByUserId,
} from "@/app_modules/investasi/_fun";
import { Investasi_UiPortofolio } from "@/app_modules/investasi/_ui";
import getStatusInvestasi from "@/app_modules/investasi/fun/master/get_status_investasi";

export default async function Page() {
  const listStatus = await getStatusInvestasi();

  const listDataPublish = await investasi_funGetAllPublishByUserId({ page: 1 });
  const listDataReview = await investasi_funGetAllInvestasiNonPublishByUserId({
    page: 1,
    statusId: "2",
  });
  const listDataDraft = await investasi_funGetAllInvestasiNonPublishByUserId({
    page: 1,
    statusId: "3",
  });
  const listDataReject = await investasi_funGetAllInvestasiNonPublishByUserId({
    page: 1,
    statusId: "4",
  });

  return (
    <>
      <Investasi_UiPortofolio
        listStatus={listStatus}
        listDataPublish={listDataPublish}
        listDataReview={listDataReview}
        listDataDraft={listDataDraft}
        listDataReject={listDataReject}
      />
    </>
  );
}
