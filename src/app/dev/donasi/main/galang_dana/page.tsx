import { PostingDonasi } from "@/app_modules/donasi";
import { donasi_funGetAllStatusDraft } from "@/app_modules/donasi/fun/get/status/get_all_status_draft";
import { donasi_funGetAllStatusPublish } from "@/app_modules/donasi/fun/get/status/get_all_status_publish";
import { donasi_funGetAllStatusReject } from "@/app_modules/donasi/fun/get/status/get_all_status_reject";
import { donasi_funGetAllStatusReview } from "@/app_modules/donasi/fun/get/status/get_all_status_review";

export default async function Page() {
  const listPublish = await donasi_funGetAllStatusPublish({ page: 1 });
  const listReview = await donasi_funGetAllStatusReview({ page: 1 });
  const listDraft = await donasi_funGetAllStatusDraft({ page: 1 });
  const listReject = await donasi_funGetAllStatusReject({ page: 1 });

  // console.log(listPublish, "ini publish")
  // console.log(listReview, "ini review")
  // console.log(listDraft, "ini draft")
  // console.log(listReject, "ini reject")

  return (
    <>
      <PostingDonasi
        listPublish={listPublish}
        listReview={listReview}
        listDraft={listDraft}
        listReject={listReject}
      />
    </>
  );
}
