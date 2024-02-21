import { Job_Status } from "@/app_modules/job";

export default async function Page() {
  return (
    <>
      <Job_Status
        listDraft={[]}
        listPublish={[]}
        listReject={[]}
        listReview={[]}
      />
    </>
  );
}
