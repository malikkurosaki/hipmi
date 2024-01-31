import { Event_StatusPage } from "@/app_modules/event";
import { Event_getByStatusId } from "@/app_modules/event/fun/get/get_event_by_status_id";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const authorId = await User_getUserId();
  const listPublish = await Event_getByStatusId("1", authorId);
  const listReview = await Event_getByStatusId("2", authorId);
  const listDraft = await Event_getByStatusId("3", authorId);
  const listReject = await Event_getByStatusId("4", authorId);

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
