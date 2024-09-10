import { AdminEvent_TableReject } from "@/app_modules/admin/event";
import { adminEvent_funGetListReject } from "@/app_modules/admin/event/fun";

export default async function Page() {
  const listReject = await adminEvent_funGetListReject({ page: 1 });

  return (
    <>
      <AdminEvent_TableReject listReject={listReject as any} />
    </>
  );
}
