import {  Job_DetailArsip } from "@/app_modules/job";
import { Job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";

export default async function Page({params}:{params: {id: string}}) {
  let jobId = params.id
  const dataJob = await Job_getOneById(jobId)
  return (
    <>
      <Job_DetailArsip dataJob={dataJob as any} />
    </>
  );
}
