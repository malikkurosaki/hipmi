import { Event_StatusPage } from "@/app_modules/event";
import { Event_getListByStatusId } from "@/app_modules/event/fun/get/get_list_event_by_status_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const authorId = await user_getOneUserId();
  const listPublish = await Event_getListByStatusId("1", authorId);
  const listReview = await Event_getListByStatusId("2", authorId);
  const listDraft = await Event_getListByStatusId("3", authorId);
  const listReject = await Event_getListByStatusId("4", authorId);

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
