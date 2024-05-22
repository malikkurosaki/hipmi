"use server";
import { Job_NonUserView } from "@/app_modules/job";
import { Job_getOneById } from "@/app_modules/job/fun/get/get_one_by_id";
import os from "os";

export default async function Page({ params }: { params: { id: string } }) {
  let jobId = params.id;
  const dataJob = await Job_getOneById(jobId);
  // const platform = os.platform();
  // const hostName =
  //   platform === "darwin"
  //     ? "http://localhost:3000"
  //     : "https://test-hipmi.wibudev.com";
  return (
    <>
      <Job_NonUserView data={dataJob as any} />
    </>
  );
}
