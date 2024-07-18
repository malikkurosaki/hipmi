import Job_UiStatus from "./ui_status";

export default function Job_ViewStatus({
  listPublish,
  listReview,
  listDraft,
  listReject,
}: {
  listPublish: any[];
  listReview: any[];
  listDraft: any[];
  listReject: any[];
}) {
  return (
    <>
      <Job_UiStatus
        listPublish={listPublish}
        listDraft={listDraft}
        listReject={listReject}
        listReview={listReview}
      />
    </>
  );
}
