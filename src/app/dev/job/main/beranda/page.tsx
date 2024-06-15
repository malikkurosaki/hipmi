import { Job_Beranda } from "@/app_modules/job";
import { Job_getAllListPublish } from "@/app_modules/job/fun/get/get_list_all_publish";

export default async function Page() {
  const listJob = await Job_getAllListPublish();

  return (
    <>
      <Job_Beranda listJob={listJob as any} />
    </>
  );
}
