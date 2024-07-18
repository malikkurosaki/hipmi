import { Event_StatusPage } from "@/app_modules/event";
import { Event_getListByStatusId } from "@/app_modules/event/fun/get/get_list_event_by_status_id";
import { event_getAllDraft } from "@/app_modules/event/fun/get/status/get_all_draft";
import { event_getAllReject } from "@/app_modules/event/fun/get/status/get_all_reject";
import { event_getAllReview } from "@/app_modules/event/fun/get/status/get_all_review";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const authorId = await user_getOneUserId();
  const listPublish = await Event_getListByStatusId("1", authorId);
  const listReview = await event_getAllReview({page: 1});
  const listDraft = await event_getAllDraft({ page: 1 });
  const listReject = await event_getAllReject({page: 1});

  return (
    <Event_StatusPage
      authorId={authorId}
      listPublish={listPublish}
      listReview={listReview}
      listDraft={listDraft}
      listReject={listReject}
    />
  );
}
