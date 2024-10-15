import { Investasi_ViewPortofolioDraft } from "./portofolio/view_portofolio_draft";
import { Investasi_ViewPortofolioPublish } from "./portofolio/view_portofolio_publish";
import { Investasi_ViewPortofolioReject } from "./portofolio/view_portofolio_reject";
import { Investasi_ViewPortofolioReview } from "./portofolio/view_portofolio_review";

export function Investasi_ViewPortofolio({
  statusId,
  dataPortofolio,
}: {
  statusId: string;
  dataPortofolio: any[];
}) {
  return (
    <>
      {statusId === "1" && (
        <Investasi_ViewPortofolioPublish
          statusId={statusId}
          dataPortofolio={dataPortofolio}
        />
      )}

      {statusId === "2" && (
        <Investasi_ViewPortofolioReview
          statusId={statusId}
          dataPortofolio={dataPortofolio}
        />
      )}

      {statusId === "3" && (
        <Investasi_ViewPortofolioDraft
          statusId={statusId}
          dataPortofolio={dataPortofolio}
        />
      )}

      {statusId === "4" && (
        <Investasi_ViewPortofolioReject
          statusId={statusId}
          dataPortofolio={dataPortofolio}
        />
      )}
    </>
  );
}
