import { AdminEvent_Main } from "@/app_modules/admin/event";
import AdminEvent_funCountByStatusId from "@/app_modules/admin/event/fun/count/fun_count_event_by_status_id";

export default async function Page() {
  const countPublish = await AdminEvent_funCountByStatusId("1");
  const countReview = await AdminEvent_funCountByStatusId("2");
  const countDraft = await AdminEvent_funCountByStatusId("3");
  const countReject = await AdminEvent_funCountByStatusId("4");

  return (
    <>
      <AdminEvent_Main
        countPublish={countPublish as number}
        countReview={countReview as number}
        countDraft={countDraft as number}
        countReject={countReject as number}
      />
    </>
  );
}
