import { Vote_Status } from "@/app_modules/voting";
import { Vote_getListByStatusId } from "@/app_modules/voting/fun/get/get_list_status_by_status_id";

export default async function Page() {
  const listPublish = await Vote_getListByStatusId("1");
  const listReview = await Vote_getListByStatusId("2");
  const listDraft = await Vote_getListByStatusId("3");
  const listReject = await Vote_getListByStatusId("4");

  return (
    <>
      <Vote_Status
        listPublish={listPublish as any}
        listReview={listReview as any}
        listDraft={listDraft as any}
        listReject={listReject as any}
      />
    </>
  );
}
