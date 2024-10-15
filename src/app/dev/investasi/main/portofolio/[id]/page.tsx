import { investasi_funGetPortofolioByStatusId } from "@/app_modules/investasi/_fun";
import { Investasi_UiPortofolio } from "@/app_modules/investasi/_ui";
import getStatusInvestasi from "@/app_modules/investasi/fun/master/get_status_investasi";

export default async function Page({ params }: { params: { id: string } }) {
  const statusId = params.id;
  const listStatus = await getStatusInvestasi();
  const dataPortofolio = await investasi_funGetPortofolioByStatusId({
    page: 1,
    statusId: statusId,
  });

  return (
    <>
      <Investasi_UiPortofolio
        statusId={statusId}
        listStatus={listStatus as any}
        dataPortofolio={dataPortofolio as any}
      />
    </>
  );
}
