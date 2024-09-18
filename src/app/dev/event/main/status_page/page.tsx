import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { Event_StatusPage } from "@/app_modules/event";
import { event_getAllDraft } from "@/app_modules/event/fun/get/status/get_all_draft";
import { event_getAllReject } from "@/app_modules/event/fun/get/status/get_all_reject";
import { event_getAllReview } from "@/app_modules/event/fun/get/status/get_all_review";
import { event_funGetAllStatusPublish } from "@/app_modules/event/fun/get/status/get_all_status_publish";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

  const listPublish = await event_funGetAllStatusPublish({ page: 1 });
  const listReview = await event_getAllReview({ page: 1 });
  const listDraft = await event_getAllDraft({ page: 1 });
  const listReject = await event_getAllReject({ page: 1 });

  return (
    <Event_StatusPage
      authorId={userLoginId}
      listPublish={listPublish}
      listReview={listReview}
      listDraft={listDraft}
      listReject={listReject}
    />
  );
}
