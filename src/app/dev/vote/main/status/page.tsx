import { Vote_Status } from "@/app_modules/vote";
import { vote_getAllDraft } from "@/app_modules/vote/fun/get/status/get_all_draft";
import { vote_getAllPublish } from "@/app_modules/vote/fun/get/status/get_all_publish";
import { vote_getAllReject } from "@/app_modules/vote/fun/get/status/get_all_reject";
import { vote_getAllReview } from "@/app_modules/vote/fun/get/status/get_all_review";

export default async function Page() {
  const listPublish = await vote_getAllPublish({page: 1});
  const listReview = await vote_getAllReview({page: 1});
  const listDraft = await vote_getAllDraft({page: 1});
  const listReject = await vote_getAllReject({page: 1});

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
