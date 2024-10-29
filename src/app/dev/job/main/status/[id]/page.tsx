import { Job_Status } from "@/app_modules/job";
import { job_funGetAllByStatusId } from "@/app_modules/job/fun";
import { job_funGetMasterStatus } from "@/app_modules/job/fun/get/get_master_status";

export default async function Page({ params }: { params: { id: string } }) {
  let statusId = params.id;

  const dataJob = await job_funGetAllByStatusId({
    page: 1,
    statusId: statusId,
  });
  const listStatus = await job_funGetMasterStatus();

  return (
    <>
      <Job_Status
        statusId={statusId}
        dataJob={dataJob}
        listStatus={listStatus as any}
      />
    </>
  );
}
