import { AdminEvent_TableReject } from "@/app_modules/admin/event";
import { AdminEvent_getListTableByStatusId } from "@/app_modules/admin/event/fun/get/get_list_table_by_status_id";

export default async function Page() {
    const listReject = await AdminEvent_getListTableByStatusId("4")

    return <>
    <AdminEvent_TableReject listReject={listReject as any}/>
    </>
}