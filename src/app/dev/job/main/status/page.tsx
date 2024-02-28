import { Job_Status } from "@/app_modules/job";
import { Job_getListStatusByStatusId } from "@/app_modules/job/fun/get/get_list_status_by_status_id";

export default async function Page() {
  const listPublish = await Job_getListStatusByStatusId("1");
  const listReview = await Job_getListStatusByStatusId("2");
  const listDraft = await Job_getListStatusByStatusId("3");
  const listReject = await Job_getListStatusByStatusId("4");



  return (
    <>
      <Job_Status
        listDraft={listDraft as any}
        listPublish={listPublish as any}
        listReject={listReject as any}
        listReview={listReview as any}
      />
    </>
  );
}
