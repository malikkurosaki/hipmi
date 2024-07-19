import { Job_Arsip } from "@/app_modules/job";
import { job_getAllArsipById } from "@/app_modules/job/fun/get/get_all_arsip";

export default async function Page() {
  const dataJob = await job_getAllArsipById({ page: 1 });

  return (
    <>
      <Job_Arsip dataJob={dataJob as any} />
    </>
  );
}
