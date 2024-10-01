import { Job_UiNotUserView } from "@/app_modules/job/_ui";
import { job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const dataJob = await job_getOneById(jobId);

  return (
    <>
      <Job_UiNotUserView data={dataJob} />
    </>
  );
}
