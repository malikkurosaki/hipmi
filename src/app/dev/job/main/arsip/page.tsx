import { Job_Arsip } from "@/app_modules/job";
import { Job_getListAllArsipById } from "@/app_modules/job/fun/get/get_list_all_arsip";

export default async function Page() {
  const dataJob = await Job_getListAllArsipById()

  return (
    <>
      <Job_Arsip dataJob={dataJob as any}/>
    </>
  );
}
