import { AdminEvent_TableReview } from "@/app_modules/admin/event";
import { AdminEvent_getListTableByStatusId } from "@/app_modules/admin/event/fun/get/get_list_table_by_status_id";

export default async function Page() {
    const listReview = await AdminEvent_getListTableByStatusId("2")

    return <>
    <AdminEvent_TableReview listReview={listReview as any}/>
    </> 
}