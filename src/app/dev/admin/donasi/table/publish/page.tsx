import { AdminDonasi_TablePublish } from "@/app_modules/admin/donasi";
import { AdminDonasi_getByStatus } from "@/app_modules/admin/donasi/fun/get/get_list_donasi_by_status";

export default async function Page() {
    const listPublish = await AdminDonasi_getByStatus("1")
    // console.log(listPublish)
    return<>
    <AdminDonasi_TablePublish listPublish={listPublish as any}/>
    </>
}