import { AdminDonasi_TableReject } from "@/app_modules/admin/donasi";
import { AdminDonasi_getByStatus } from "@/app_modules/admin/donasi/fun/get/get_list_donasi_by_status";

export default async function Page() {
    const dataReject = await AdminDonasi_getByStatus("4")
    // console.log(dataReject)
    return<>
    <AdminDonasi_TableReject dataReject={dataReject as any}/>
    </>
}