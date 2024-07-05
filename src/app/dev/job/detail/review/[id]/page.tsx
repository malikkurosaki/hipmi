import Job_DetailReview from "@/app_modules/job/detail/review/view";
import { job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";
import React from "react";

export default async function Page({
  params,
}: {
  params: { id: React.ReactNode };
}) {
  let jobId = params.id;
  const dataJob = await job_getOneById(jobId)

  return (
    <>
      <Job_DetailReview dataJob={dataJob as any} />
    </>
  );
}
