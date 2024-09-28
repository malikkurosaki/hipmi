"use server";
import { Job_MainDetail } from "@/app_modules/job";
import { job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";
import app_config from "@/util/app_config";

export default async function Page({ params }: { params: { id: string } }) {
  const idJob = params.id;
  const dataJob = await job_getOneById(idJob);

  return (
    <>
      <Job_MainDetail dataJob={dataJob as any} hostName={app_config.host} />
    </>
  );
}
