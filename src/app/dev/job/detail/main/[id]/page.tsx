import { Job_MainDetail } from "@/app_modules/job";
import { Job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const dataJob = await Job_getOneById(jobId)

  return (
    <>
      <Job_MainDetail dataJob={dataJob as any} />
    </>
  );
}
