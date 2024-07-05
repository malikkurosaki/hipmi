import Job_DetailDraft from "@/app_modules/job/detail/draft/view";
import { job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";


export default async function Page({params}: {params: {id: string}}) {
  let jobId = params.id
  const dataJob = await job_getOneById(jobId)

  return (
    <>
      <Job_DetailDraft dataJob={dataJob as any} />
    </>
  );
}
