
import Job_DetailReject from "@/app_modules/job/detail/reject/view";
import { Job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";

export default async function Page({params}: {params: {id: string}}) {
  let jobId = params.id
  const dataJob = await Job_getOneById(jobId)

  return (
    <>
      <Job_DetailReject dataJob={dataJob as any} />
    </>
  );
}
