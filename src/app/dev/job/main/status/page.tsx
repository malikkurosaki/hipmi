import { Job_Status } from "@/app_modules/job";
import job_getAllStatusDraft from "@/app_modules/job/fun/get/status/get_list_draft";
import job_getAllStatusPublish from "@/app_modules/job/fun/get/status/get_list_publish";
import job_getAllStatusReject from "@/app_modules/job/fun/get/status/get_list_reject";
import job_getAllStatusReview from "@/app_modules/job/fun/get/status/get_list_review";

export default async function Page() {
  const listPublish = await job_getAllStatusPublish({page: 1});
  const listReview = await job_getAllStatusReview({ page: 1 });
  const listDraft = await job_getAllStatusDraft({ page: 1 });
  const listReject = await job_getAllStatusReject({page: 1});

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
