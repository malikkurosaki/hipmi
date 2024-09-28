import { Job_ViewBeranda } from "@/app_modules/job";
import { job_getAllListPublish } from "@/app_modules/job/fun/get/get_all_publish";

export default async function Page() {
  const listJob = await job_getAllListPublish({ page: 1 });

  return (
    <>
      <Job_ViewBeranda listJob={listJob as any} />
    </>
  );
}
